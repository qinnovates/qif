/**
 * Navigation Configuration - Single Source of Truth
 * Define the entire site navigation structure here.
 * All pages reference this file for consistent navigation.
 */

const NAV_CONFIG = {
  logo: {
    text: "Mindloft",
    separator: "|",
    tagline: "Neurosecurity Standards",
    href: "/"
  },

  items: [
    {
      label: "Home",
      href: "/",
      exact: true // Only highlight on exact match
    },
    {
      label: "Research",
      href: "#", // Not clickable, only shows dropdown
      dropdown: [
        {
          label: "Documentation",
          href: "/documentation/",
          description: "Framework documentation & guides"
        },
        {
          label: "QIF Whitepaper",
          href: "/qif-whitepaper/",
          description: "Quantum Indeterministic Framework"
        },
        {
          label: "ONI Whitepaper (Legacy)",
          href: "/whitepaper/",
          description: "Original Open Neurosecurity Interoperability"
        },
        {
          label: "Bridge Framework",
          href: "/bridge/",
          description: "Classical-quantum integration"
        }
      ]
    },
    {
      label: "Classical",
      href: "/classical/",
      dropdown: [
        {
          label: "Classical Neurosec Overview",
          href: "/classical/",
          description: "14-layer ONI security model"
        },
        {
          label: "Visualizations",
          href: "/visualizations/",
          description: "Interactive security tools"
        }
      ]
    },
    {
      label: "Quantum",
      href: "/quantum/",
      dropdown: [
        {
          label: "Quantum Neurosec Overview",
          href: "/quantum/",
          description: "QIF hourglass architecture"
        },
        {
          label: "QIF 3D Model",
          href: "/visualizations/12-qif-3d-model.html",
          description: "Interactive 3D visualization"
        }
      ]
    },
    {
      label: "Governance",
      href: "/governance/",
      dropdown: [
        {
          label: "Governance Overview",
          href: "/governance/",
          description: "Neuroethics & compliance framework"
        }
      ]
    },
    {
      label: "Resources",
      href: "#",
      dropdown: [
        {
          label: "News & Intel",
          href: "/bci-news/",
          description: "Latest from academia, industry & researchers"
        },
        {
          label: "Blog",
          href: "/blog/",
          description: "Research insights & updates"
        },
        {
          label: "Visualizations",
          href: "/visualizations/",
          description: "Interactive exploration tools"
        },
        {
          label: "Legacy Versions",
          href: "/legacy/",
          description: "Historical framework versions"
        }
      ]
    },
    {
      label: "About",
      href: "/about/",
      dropdown: [
        {
          label: "About",
          href: "/about/",
          description: "Mission, vision, and background"
        },
        {
          label: "Team",
          href: "/about/team/",
          description: "Meet the researchers and contributors"
        }
      ]
    }
  ],

  // Mobile breakpoint (px)
  mobileBreakpoint: 768
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NAV_CONFIG;
}
