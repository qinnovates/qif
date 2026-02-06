/**
 * Comprehensive BCI/NeuroSec News Sources
 * Single source of truth for all feed aggregation
 *
 * Categories:
 * - industry: BCI companies and startups
 * - academia: Universities, research labs, papers
 * - government: DARPA, NIH, EU programs, defense
 * - neuroethics: Ethics centers, policy orgs
 * - quantum: Quantum + neuroscience research
 * - security: BCI security, exploits, vulnerabilities
 */

const FEED_SOURCES = {
  // ========================================
  // INDUSTRY - BCI Companies
  // ========================================
  industry: [
    {
      name: 'Neuralink',
      handle: '@neuralink',
      url: 'https://neuralink.com',
      rss: 'https://neuralink.com/blog/rss/',
      description: 'Implantable brain-machine interfaces',
      type: 'invasive-bci'
    },
    {
      name: 'Kernel',
      handle: '@KernelCo',
      url: 'https://www.kernel.com',
      description: 'Non-invasive neural recording technology',
      type: 'non-invasive-bci'
    },
    {
      name: 'OpenBCI',
      handle: '@OpenBCI',
      url: 'https://openbci.com',
      rss: 'https://openbci.com/community/feed/',
      description: 'Open-source brain-computer interfaces',
      type: 'open-source-bci'
    },
    {
      name: 'Emotiv',
      handle: '@emotiv',
      url: 'https://www.emotiv.com',
      rss: 'https://www.emotiv.com/blogs/news.atom',
      description: 'EEG headsets for research and consumer',
      type: 'non-invasive-bci'
    },
    {
      name: 'Synchron',
      handle: '@SynchronInc',
      url: 'https://synchron.com',
      description: 'Endovascular brain-computer interface',
      type: 'invasive-bci'
    },
    {
      name: 'Blackrock Neurotech',
      handle: '@blackrockneuro',
      url: 'https://blackrockneurotech.com',
      rss: 'https://blackrockneurotech.com/feed/',
      description: 'Neural interfaces for research and clinical',
      type: 'invasive-bci'
    },
    {
      name: 'Paradromics',
      handle: '@paradromicsinc',
      url: 'https://www.paradromics.com',
      description: 'High-bandwidth neural interface',
      type: 'invasive-bci'
    },
    {
      name: 'CTRL-labs (Meta)',
      handle: '@CTRLlabsCo',
      url: 'https://www.ctrl-labs.com',
      description: 'Neural interface for AR/VR (acquired by Meta)',
      type: 'non-invasive-bci'
    },
    {
      name: 'NextMind (Snap)',
      url: 'https://www.next-mind.com',
      description: 'Real-time brain-computer interface (acquired by Snap)',
      type: 'non-invasive-bci'
    },
    {
      name: 'BrainCo',
      handle: '@BrainCoTech',
      url: 'https://www.brainco.tech',
      description: 'AI-powered BCI for education and prosthetics',
      type: 'non-invasive-bci'
    },
    {
      name: 'Neurable',
      handle: '@Neurable',
      url: 'https://neurable.com',
      description: 'Brain-computer interface for everyday devices',
      type: 'non-invasive-bci'
    },
    {
      name: 'NeuroSky',
      url: 'https://neurosky.com',
      description: 'Biosensor technology for consumer devices',
      type: 'non-invasive-bci'
    },
    {
      name: 'g.tec',
      url: 'https://www.gtec.at',
      rss: 'https://www.gtec.at/feed/',
      description: 'BCI research equipment and medical devices',
      type: 'research-equipment'
    },
    {
      name: 'ANT Neuro',
      url: 'https://www.ant-neuro.com',
      description: 'EEG systems for research and clinical',
      type: 'research-equipment'
    },
    {
      name: 'Cognionics',
      url: 'https://www.cognionics.com',
      description: 'Mobile EEG systems',
      type: 'research-equipment'
    }
  ],

  // ========================================
  // ACADEMIA - Universities & Research
  // ========================================
  academia: [
    {
      name: 'MIT Media Lab - Fluid Interfaces',
      url: 'https://www.media.mit.edu/groups/fluid-interfaces/',
      rss: 'https://www.media.mit.edu/groups/fluid-interfaces/posts/feed/',
      pi: 'Pattie Maes',
      description: 'Wearable computing and brain-computer interfaces'
    },
    {
      name: 'Stanford Neural Prosthetics Lab',
      url: 'https://nptl.stanford.edu',
      pi: 'Krishna Shenoy',
      description: 'Neural prosthetics and brain-machine interfaces'
    },
    {
      name: 'Brown BrainGate',
      url: 'https://www.braingate.org',
      rss: 'https://www.braingate.org/feed/',
      description: 'Clinical trials of neural interface systems'
    },
    {
      name: 'Carnegie Mellon - BCI Lab',
      url: 'https://www.ri.cmu.edu/robotics-groups/brain-computer-interface-lab/',
      description: 'Non-invasive BCI research'
    },
    {
      name: 'Duke Center for Neuroengineering',
      url: 'https://neuroengineering.duke.edu',
      pi: 'Miguel Nicolelis',
      description: 'Brain-machine interface research'
    },
    {
      name: 'UC Berkeley - Neural Engineering',
      url: 'https://neuroscience.berkeley.edu',
      rss: 'https://neuroscience.berkeley.edu/feed/',
      description: 'Neuroscience and neural engineering'
    },
    {
      name: 'Columbia Neural Engineering',
      url: 'https://www.engineering.columbia.edu/research/areas/neural-engineering',
      description: 'Neural prosthetics and BCIs'
    },
    {
      name: 'ETH Zurich - Neural Control',
      url: 'https://www.ncl.ethz.ch',
      description: 'Neural control of movement lab'
    },
    {
      name: 'Imperial College - Brain Sciences',
      url: 'https://www.imperial.ac.uk/brain-sciences',
      rss: 'https://www.imperial.ac.uk/brain-sciences/news/feed/',
      description: 'Brain sciences research'
    },
    {
      name: 'Wyss Center Geneva',
      url: 'https://www.wysscenter.ch',
      rss: 'https://www.wysscenter.ch/feed',
      description: 'Neurotechnology research and development'
    },
    {
      name: 'arXiv - Neurons and Cognition',
      url: 'https://arxiv.org/list/q-bio.NC/recent',
      rss: 'https://export.arxiv.org/rss/q-bio.NC',
      description: 'Neuroscience preprints'
    },
    {
      name: 'arXiv - Neural and Evolutionary Computing',
      url: 'https://arxiv.org/list/cs.NE/recent',
      rss: 'https://export.arxiv.org/rss/cs.NE',
      description: 'Neural computing research'
    },
    {
      name: 'Nature Neuroscience',
      url: 'https://www.nature.com/neuro/',
      rss: 'https://www.nature.com/subjects/neuroscience.rss',
      description: 'Leading neuroscience journal'
    },
    {
      name: 'PubMed - Brain Computer Interface',
      rss: 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1FUxKC0z6yYVLRzH_7RL7GX0uL-tNqvlBnCHUQCx_ZGfxo/',
      description: 'Latest BCI research papers'
    },
    {
      name: 'PubMed - Neuroethics',
      rss: 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1kY4_9GvKj_vxOH8FZxXLGOYPhtDpZ-gqJ3mQh3jT/',
      description: 'Neuroethics research papers'
    }
  ],

  // ========================================
  // GOVERNMENT & AGENCIES
  // ========================================
  government: [
    {
      name: 'DARPA',
      handle: '@DARPA',
      url: 'https://www.darpa.mil',
      rss: 'https://www.darpa.mil/rss/news.xml',
      description: 'Defense Advanced Research Projects Agency',
      programs: ['N3', 'BTO', 'RAM']
    },
    {
      name: 'NIH BRAIN Initiative',
      url: 'https://braininitiative.nih.gov',
      rss: 'https://braininitiative.nih.gov/news-events/feed',
      description: 'Brain Research through Advancing Innovative Neurotechnologies'
    },
    {
      name: 'NSF - Engineering Biology',
      url: 'https://www.nsf.gov/news/special_reports/ebics/',
      description: 'National Science Foundation neural engineering'
    },
    {
      name: 'EU Human Brain Project',
      url: 'https://www.humanbrainproject.eu',
      rss: 'https://www.humanbrainproject.eu/en/feed/',
      description: 'European neuroscience flagship project'
    },
    {
      name: 'UK Research and Innovation - Neuroscience',
      url: 'https://www.ukri.org',
      description: 'UK government research funding'
    },
    {
      name: 'FDA - Neurological Devices',
      url: 'https://www.fda.gov/medical-devices/products-and-medical-procedures/neurological-devices',
      description: 'FDA regulation of neural devices'
    },
    {
      name: 'IARPA',
      url: 'https://www.iarpa.gov',
      description: 'Intelligence Advanced Research Projects Activity',
      programs: ['MICrONS', 'FELIX']
    }
  ],

  // ========================================
  // NEUROETHICS & POLICY
  // ========================================
  neuroethics: [
    {
      name: 'The Neuroethics Blog',
      url: 'https://www.theneuroethicsblog.com',
      rss: 'https://www.theneuroethicsblog.com/feed/',
      description: 'Commentary on neuroethics and neuroscience policy'
    },
    {
      name: 'Stanford Center for Biomedical Ethics',
      url: 'https://bioethics.stanford.edu',
      description: 'Neuroethics research and policy'
    },
    {
      name: 'Neuroethics Society',
      url: 'https://www.neuroethicssociety.org',
      description: 'International neuroethics organization'
    },
    {
      name: 'UNESCO Bioethics',
      url: 'https://www.unesco.org/en/bioethics',
      description: 'International bioethics standards'
    },
    {
      name: 'IEEE Brain',
      handle: '@IEEEBrain',
      url: 'https://brain.ieee.org',
      description: 'IEEE neuroethics and standards initiative'
    },
    {
      name: 'Neurorights Foundation',
      url: 'https://neurorightsfoundation.org',
      description: 'Advocacy for cognitive liberty and mental privacy'
    },
    {
      name: 'Future of Life Institute - AI Safety',
      url: 'https://futureoflife.org',
      rss: 'https://futureoflife.org/feed/',
      description: 'AI and neurotechnology safety research'
    }
  ],

  // ========================================
  // QUANTUM + NEUROSCIENCE
  // ========================================
  quantum: [
    {
      name: 'arXiv - Quantum Biology',
      url: 'https://arxiv.org/search/?query=quantum+biology+brain',
      rss: 'https://export.arxiv.org/rss/quant-ph',
      description: 'Quantum physics in biological systems'
    },
    {
      name: 'Nature - Quantum Information',
      url: 'https://www.nature.com/subjects/quantum-information',
      rss: 'https://www.nature.com/subjects/quantum-information.rss',
      description: 'Quantum computing and information'
    },
    {
      name: 'PubMed - Quantum Neuroscience',
      rss: 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1QH8dFpIvHZxY6R_qLxXGJZ0TcNqOhvlKVOx/',
      description: 'Quantum effects in neuroscience'
    },
    {
      name: 'Institute for Quantum Computing',
      url: 'https://uwaterloo.ca/institute-for-quantum-computing/',
      rss: 'https://uwaterloo.ca/institute-for-quantum-computing/news/feed',
      description: 'Quantum computing research'
    },
    {
      name: 'Quantum Information Science News',
      url: 'https://quantumcomputingreport.com',
      rss: 'https://quantumcomputingreport.com/feed/',
      description: 'Quantum computing industry news'
    }
  ],

  // ========================================
  // SECURITY - BCI & Biotech Exploits
  // ========================================
  security: [
    {
      name: 'arXiv - Cryptography and Security',
      url: 'https://arxiv.org/list/cs.CR/recent',
      rss: 'https://export.arxiv.org/rss/cs.CR',
      description: 'Security and cryptography research'
    },
    {
      name: 'IEEE Security & Privacy',
      url: 'https://www.ieee-security.org',
      description: 'Computer security research'
    },
    {
      name: 'USENIX Security',
      url: 'https://www.usenix.org/conferences/byname/108',
      description: 'Security symposium research'
    },
    {
      name: 'Black Hat - Biohacking Village',
      url: 'https://www.blackhat.com',
      description: 'Security conference with biotech track'
    },
    {
      name: 'DEF CON - Biohacking Village',
      url: 'https://www.defcon.org',
      description: 'Hacker conference biohacking research'
    },
    {
      name: 'CVE - Medical Devices',
      url: 'https://cve.mitre.org',
      description: 'Known vulnerabilities in medical devices'
    },
    {
      name: 'FDA - Cybersecurity for Medical Devices',
      url: 'https://www.fda.gov/medical-devices/digital-health-center-excellence/cybersecurity',
      description: 'Medical device security guidance'
    },
    {
      name: 'Talos Intelligence',
      url: 'https://blog.talosintelligence.com',
      rss: 'https://blog.talosintelligence.com/rss/',
      description: 'Threat intelligence and vulnerability research'
    }
  ],

  // ========================================
  // STANDARDS & CONSORTIUMS
  // ========================================
  standards: [
    {
      name: 'ISO/TC 215 - Health Informatics',
      url: 'https://www.iso.org/committee/54960.html',
      description: 'International medical device standards'
    },
    {
      name: 'ASTM F04 - Medical & Surgical Materials',
      url: 'https://www.astm.org/committee-f04',
      description: 'Medical device standards'
    },
    {
      name: 'NeuroTechX',
      handle: '@NeuroTechX',
      url: 'https://neurotechx.com',
      description: 'International neurotechnology community'
    },
    {
      name: 'BCI Society',
      url: 'https://bcisociety.org',
      description: 'International BCI research community'
    }
  ]
};

// Category metadata
const CATEGORY_INFO = {
  industry: {
    label: 'Industry',
    color: '#06b6d4',
    icon: '🏢',
    description: 'BCI companies and startups'
  },
  academia: {
    label: 'Academia',
    color: '#8b5cf6',
    icon: '🎓',
    description: 'Universities and research labs'
  },
  government: {
    label: 'Government',
    color: '#d4a543',
    icon: '🏛️',
    description: 'Government agencies and programs'
  },
  neuroethics: {
    label: 'Neuroethics',
    color: '#10b981',
    icon: '⚖️',
    description: 'Ethics and policy organizations'
  },
  quantum: {
    label: 'Quantum',
    color: '#ec4899',
    icon: '⚛️',
    description: 'Quantum neuroscience research'
  },
  security: {
    label: 'Security',
    color: '#ef4444',
    icon: '🔒',
    description: 'BCI security and vulnerabilities'
  },
  standards: {
    label: 'Standards',
    color: '#64748b',
    icon: '📋',
    description: 'Standards bodies and consortiums'
  }
};

// Export for use in aggregator
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FEED_SOURCES, CATEGORY_INFO };
}
