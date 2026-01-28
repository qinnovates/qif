#!/usr/bin/env python3
"""
LearnViz Web UI

A local web interface for generating educational visualizations.
Run with: streamlit run ui.py
Or: python -m learnviz.ui

No server infrastructure needed - runs entirely on your machine.
"""

import streamlit as st
import os
import sys
import json
import tempfile
from pathlib import Path
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from analyzer import analyze, Engine, ConceptType
from generators.manim_gen import generate_manim_code, TEMPLATES
from generators.narration import ScriptGenerator, TTSGenerator


# Page config
st.set_page_config(
    page_title="LearnViz - Educational Visualizations",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: bold;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0;
    }
    .sub-header {
        color: #666;
        font-size: 1.1rem;
        margin-top: 0;
    }
    .info-box {
        background-color: #f0f2f6;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
    }
    .success-box {
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
    }
    .stVideo {
        border-radius: 10px;
    }
</style>
""", unsafe_allow_html=True)


def check_dependencies():
    """Check which dependencies are available."""
    deps = {}

    # Check Manim
    try:
        import manim
        deps['manim'] = True
    except ImportError:
        deps['manim'] = False

    # Check ffmpeg
    import subprocess
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        deps['ffmpeg'] = True
    except:
        deps['ffmpeg'] = False

    # Check TTS engines
    try:
        import gtts
        deps['gtts'] = True
    except ImportError:
        deps['gtts'] = False

    try:
        import edge_tts
        deps['edge_tts'] = True
    except ImportError:
        deps['edge_tts'] = False

    try:
        import pyttsx3
        deps['pyttsx3'] = True
    except ImportError:
        deps['pyttsx3'] = False

    return deps


def render_video(code_path: str, quality: str = "l"):
    """Render Manim code to video."""
    import subprocess
    import re

    with open(code_path, "r") as f:
        content = f.read()

    match = re.search(r"class (\w+)\(Scene\)", content)
    if not match:
        return None, "No Scene class found"

    scene_name = match.group(1)
    cmd = f"manim -pql {code_path} {scene_name}"

    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=str(Path(code_path).parent))

    if result.returncode != 0:
        return None, result.stderr

    # Find output file
    code_stem = Path(code_path).stem
    media_dir = Path(code_path).parent / "media" / "videos" / code_stem / "480p15"

    if media_dir.exists():
        files = list(media_dir.glob("*.mp4"))
        if files:
            return str(files[0]), None

    return None, "Output file not found"


def combine_audio_video(video_path: str, audio_path: str):
    """Combine video and audio."""
    import subprocess

    output_path = video_path.replace(".mp4", "_narrated.mp4")

    # Get durations
    def get_duration(path):
        result = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", path],
            capture_output=True, text=True
        )
        try:
            return float(result.stdout.strip())
        except:
            return 0

    video_dur = get_duration(video_path)
    audio_dur = get_duration(audio_path)
    extra = max(0, audio_dur - video_dur + 1)

    if extra > 0:
        cmd = [
            "ffmpeg", "-y", "-i", video_path, "-i", audio_path,
            "-filter_complex", f"[0:v]tpad=stop_mode=clone:stop_duration={extra}[v]",
            "-map", "[v]", "-map", "1:a",
            "-c:v", "libx264", "-c:a", "aac", "-shortest", output_path
        ]
    else:
        cmd = [
            "ffmpeg", "-y", "-i", video_path, "-i", audio_path,
            "-c:v", "copy", "-c:a", "aac",
            "-map", "0:v:0", "-map", "1:a:0", "-shortest", output_path
        ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    return output_path if result.returncode == 0 else None


def main():
    # Header
    st.markdown('<p class="main-header">LearnViz</p>', unsafe_allow_html=True)
    st.markdown('<p class="sub-header">Transform concepts into educational visualizations</p>', unsafe_allow_html=True)

    # Sidebar
    with st.sidebar:
        st.header("Settings")

        # Check dependencies
        deps = check_dependencies()

        with st.expander("System Status", expanded=False):
            for dep, available in deps.items():
                icon = "✅" if available else "❌"
                st.write(f"{icon} {dep}")

            if not deps['manim']:
                st.warning("Install Manim: `pip install manim`")
            if not deps['ffmpeg']:
                st.warning("Install ffmpeg: `brew install ffmpeg`")

        st.divider()

        # Options
        st.subheader("Generation Options")

        quality = st.selectbox(
            "Video Quality",
            options=["l", "m", "h"],
            format_func=lambda x: {"l": "Low (fast)", "m": "Medium", "h": "High (slow)"}[x],
            index=0
        )

        add_narration = st.checkbox("Add Voice Narration", value=True)

        if add_narration:
            tts_options = []
            if deps['edge_tts']:
                tts_options.append("edge-tts")
            if deps['gtts']:
                tts_options.append("gtts")
            if deps['pyttsx3']:
                tts_options.append("pyttsx3")

            if tts_options:
                tts_engine = st.selectbox("TTS Engine", options=tts_options)
            else:
                st.warning("No TTS engine available. Install with: `pip install edge-tts`")
                tts_engine = None
        else:
            tts_engine = None

        st.divider()

        # Templates
        st.subheader("Available Templates")
        template_list = list(set(TEMPLATES.keys()) - {"search_visual", "sort_visual", "proof_steps", "neuron_structure"})
        for t in sorted(template_list):
            st.write(f"• {t.replace('_', ' ').title()}")

    # Main content
    col1, col2 = st.columns([2, 1])

    with col1:
        st.subheader("What do you want to learn?")

        concept = st.text_area(
            "Describe a concept to visualize",
            placeholder="Examples:\n• How does binary search work?\n• Explain synaptic transmission\n• Show me the Pythagorean theorem\n• How does an action potential propagate?",
            height=120,
            label_visibility="collapsed"
        )

        # Quick examples
        st.write("**Quick examples:**")
        example_cols = st.columns(4)
        examples = [
            "Binary search algorithm",
            "Synaptic transmission",
            "Action potential",
            "Pythagorean theorem"
        ]
        for i, ex in enumerate(examples):
            if example_cols[i].button(ex, use_container_width=True):
                concept = ex
                st.session_state['concept'] = ex
                st.rerun()

    with col2:
        st.subheader("Analysis")

        if concept:
            plan = analyze(concept)

            st.metric("Concept Type", plan.concept_type.value.title())
            st.metric("Template", plan.template or "Generic")
            st.metric("Complexity", plan.complexity.title())

            if plan.template in TEMPLATES:
                st.success(f"✨ Template matched: {plan.template}")
            else:
                st.info("Will generate generic visualization")

    # Generate button
    st.divider()

    if st.button("🎬 Generate Visualization", type="primary", use_container_width=True, disabled=not concept):
        if not deps['manim']:
            st.error("Manim is required. Install with: `pip install manim`")
            return

        # Create temp directory for this generation
        with tempfile.TemporaryDirectory() as tmpdir:
            tmpdir = Path(tmpdir)

            # Progress
            progress = st.progress(0, text="Analyzing concept...")

            # Analyze
            plan = analyze(concept)
            progress.progress(10, text="Generating visualization code...")

            # Generate code
            code = generate_manim_code(plan.to_dict(), template_name=plan.template, params={})

            code_path = tmpdir / "scene.py"
            with open(code_path, "w") as f:
                f.write(code)

            progress.progress(20, text="Rendering video (this may take a minute)...")

            # Render
            video_path, error = render_video(str(code_path), quality)

            if error:
                st.error(f"Render failed: {error}")
                with st.expander("Generated Code"):
                    st.code(code, language="python")
                return

            progress.progress(60, text="Video rendered!")

            # Generate narration if requested
            audio_path = None
            if add_narration and tts_engine and plan.template:
                progress.progress(70, text="Generating narration...")

                try:
                    script = ScriptGenerator.generate_script(plan.template)
                    tts = TTSGenerator(engine=tts_engine, output_dir=str(tmpdir))
                    audio_path = tts.generate(script, filename="narration.mp3")

                    if audio_path:
                        progress.progress(80, text="Combining video and audio...")

                        # Combine
                        if deps['ffmpeg']:
                            combined = combine_audio_video(video_path, str(audio_path))
                            if combined:
                                video_path = combined
                                progress.progress(90, text="Done!")
                except Exception as e:
                    st.warning(f"Narration failed: {e}")

            progress.progress(100, text="Complete!")

            # Display result
            st.divider()
            st.subheader("Your Visualization")

            # Video player
            with open(video_path, "rb") as f:
                video_bytes = f.read()
            st.video(video_bytes)

            # Download buttons
            col1, col2, col3 = st.columns(3)

            with col1:
                st.download_button(
                    "📥 Download Video",
                    video_bytes,
                    file_name=f"learnviz_{plan.template or 'visualization'}.mp4",
                    mime="video/mp4"
                )

            with col2:
                st.download_button(
                    "📄 Download Code",
                    code,
                    file_name=f"learnviz_{plan.template or 'visualization'}.py",
                    mime="text/x-python"
                )

            if audio_path and Path(audio_path).exists():
                with col3:
                    with open(audio_path, "rb") as f:
                        audio_bytes = f.read()
                    st.download_button(
                        "🔊 Download Audio",
                        audio_bytes,
                        file_name=f"learnviz_{plan.template or 'visualization'}_narration.mp3",
                        mime="audio/mpeg"
                    )

            # Show code
            with st.expander("View Generated Code"):
                st.code(code, language="python")

            # Narration script
            if add_narration and plan.template:
                try:
                    script = ScriptGenerator.generate_script(plan.template)
                    with st.expander("View Narration Script"):
                        for seg in script.segments:
                            st.markdown(f"**{seg.id.replace('_', ' ').title()}** ({seg.duration}s)")
                            st.write(seg.text)
                            st.divider()
                except:
                    pass

    # Footer
    st.divider()
    st.markdown("""
    <div style="text-align: center; color: #666; font-size: 0.9rem;">
        <p>LearnViz is part of <a href="https://github.com/qikevinl/ONI" target="_blank">ONI Academy</a></p>
        <p>🔒 100% Local - Your data never leaves your machine</p>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()
