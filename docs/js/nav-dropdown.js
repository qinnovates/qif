/**
 * Navigation Dropdown System
 * Dynamically generates navigation from NAV_CONFIG
 * Handles hover dropdowns (desktop) and click dropdowns (mobile)
 *
 * Usage:
 *   1. Include nav-config.js before this file
 *   2. Include nav-dropdown.css
 *   3. Add <nav id="main-nav"></nav> to HTML
 *   4. Call initNavigation() when DOM is ready
 */

(function() {
  'use strict';

  /**
   * Initialize the navigation system
   */
  function initNavigation() {
    const navElement = document.getElementById('main-nav');
    if (!navElement) {
      console.warn('Navigation element #main-nav not found');
      return;
    }

    // Generate navigation HTML
    const navHTML = generateNavigationHTML();
    navElement.innerHTML = navHTML;

    // Set up event listeners
    setupEventListeners();

    // Set active states based on current URL
    setActiveStates();
  }

  /**
   * Generate navigation HTML from config
   */
  function generateNavigationHTML() {
    const { logo, items } = NAV_CONFIG;

    const logoHTML = `
      <a href="${logo.href}" class="nav-logo">
        ${logo.text}
        <span class="separator">${logo.separator}</span>
        <span class="tagline">${logo.tagline}</span>
      </a>
    `;

    const itemsHTML = items.map(item => {
      if (item.dropdown && item.dropdown.length > 0) {
        // Item with dropdown
        return `
          <li class="has-dropdown">
            <button class="nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false">
              ${item.label}
            </button>
            <div class="nav-dropdown" role="menu">
              ${item.dropdown.map(dropdownItem => `
                <a href="${dropdownItem.href}" class="nav-dropdown-item" role="menuitem">
                  <span class="nav-dropdown-item-label">${dropdownItem.label}</span>
                  ${dropdownItem.description ? `<span class="nav-dropdown-item-description">${dropdownItem.description}</span>` : ''}
                </a>
              `).join('')}
            </div>
          </li>
        `;
      } else {
        // Simple link
        return `
          <li>
            <a href="${item.href}" ${item.exact ? 'data-exact="true"' : ''}>${item.label}</a>
          </li>
        `;
      }
    }).join('');

    return `
      <div class="nav-inner">
        ${logoHTML}
        <ul class="nav-links" id="nav-links">
          ${itemsHTML}
        </ul>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    `;
  }

  /**
   * Set up event listeners
   */
  function setupEventListeners() {
    // Mobile hamburger menu toggle
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
      });
    }

    // Mobile dropdown toggle (click to expand)
    if (window.innerWidth <= NAV_CONFIG.mobileBreakpoint) {
      setupMobileDropdowns();
    }

    // Re-setup mobile dropdowns on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const navLinks = document.getElementById('nav-links');
        if (navLinks) {
          navLinks.classList.remove('open');
        }

        if (window.innerWidth <= NAV_CONFIG.mobileBreakpoint) {
          setupMobileDropdowns();
        } else {
          teardownMobileDropdowns();
        }
      }, 250);
    });
  }

  /**
   * Set up mobile dropdown click behavior
   */
  function setupMobileDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
      // Remove any existing listeners
      const newTrigger = trigger.cloneNode(true);
      trigger.parentNode.replaceChild(newTrigger, trigger);

      // Add click listener
      newTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= NAV_CONFIG.mobileBreakpoint) {
          e.preventDefault();
          const parent = newTrigger.closest('.has-dropdown');
          parent.classList.toggle('mobile-expanded');

          const isExpanded = parent.classList.contains('mobile-expanded');
          newTrigger.setAttribute('aria-expanded', isExpanded);
        }
      });
    });
  }

  /**
   * Teardown mobile dropdown behavior
   */
  function teardownMobileDropdowns() {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('mobile-expanded');
    });
  }

  /**
   * Set active states based on current URL
   */
  function setActiveStates() {
    const currentPath = window.location.pathname;

    // Remove trailing slash for comparison (except root)
    const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

    // Check top-level links
    const topLinks = document.querySelectorAll('.nav-links > li > a[href]');
    topLinks.forEach(link => {
      const href = link.getAttribute('href');
      const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '');
      const isExact = link.hasAttribute('data-exact');

      if (isExact) {
        // Exact match only (for Home)
        if (normalizedPath === normalizedHref) {
          link.classList.add('active');
        }
      } else {
        // Prefix match (for other top-level items)
        if (normalizedPath === normalizedHref ||
            (normalizedHref !== '/' && normalizedPath.startsWith(normalizedHref))) {
          link.classList.add('active');
        }
      }
    });

    // Check dropdown items
    const dropdownItems = document.querySelectorAll('.nav-dropdown-item');
    dropdownItems.forEach(item => {
      const href = item.getAttribute('href');
      const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '');

      if (normalizedPath === normalizedHref ||
          (normalizedHref !== '/' && normalizedPath.startsWith(normalizedHref))) {
        item.classList.add('active');

        // Also highlight parent dropdown trigger
        const parentDropdown = item.closest('.has-dropdown');
        if (parentDropdown) {
          const trigger = parentDropdown.querySelector('.nav-dropdown-trigger');
          if (trigger) {
            trigger.classList.add('active');
          }
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

  // Export for manual initialization if needed
  window.initNavigation = initNavigation;
})();
