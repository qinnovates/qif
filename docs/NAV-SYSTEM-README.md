# Navigation Dropdown System

A modular, hover-based navigation system with dropdowns for mindloft.org.

## Architecture (As-Code Principle)

The navigation is built on the **single source of truth** principle:

```
nav-config.js         ← EDIT THIS to change navigation structure
    ↓
nav-dropdown.js       ← Reads config, generates HTML, handles events
    ↓
nav-dropdown.css      ← Styles the generated navigation
    ↓
All HTML pages        ← Reference the same JS/CSS files
```

**Change navigation once → Updates everywhere**

## Files

| File | Purpose | Edit? |
|------|---------|-------|
| `js/nav-config.js` | **Navigation structure definition** | **YES** - Add/remove pages here |
| `js/nav-dropdown.js` | **Logic** - Generates nav from config | NO - Only if changing behavior |
| `css/nav-dropdown.css` | **Styles** - Dropdown appearance | YES - For visual customization |

## How to Use

### Step 1: Include in HTML

Add these to the `<head>` section of your HTML page:

```html
<!-- Navigation System -->
<link rel="stylesheet" href="/css/nav-dropdown.css">
<script src="/js/nav-config.js"></script>
<script src="/js/nav-dropdown.js"></script>
```

### Step 2: Add Navigation Container

Replace your existing `<nav>` with:

```html
<nav id="main-nav"></nav>
```

That's it! The JavaScript will automatically populate it.

### Step 3: Define CSS Variables

Make sure your page defines these CSS variables:

```css
:root {
  --bg-deep: #050a14;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-purple: #8b5cf6;
  --accent-cyan: #06b6d4;
  --accent-amber: #d4a543;
}
```

## Features

### Desktop
- **Hover to reveal** - Dropdowns appear on hover
- **Smooth animations** - Fade in/out transitions
- **Active state highlighting** - Current page highlighted
- **Auto-positioning** - Dropdowns center under parent item

### Mobile
- **Click to expand** - Tap dropdown items to expand
- **Hamburger menu** - Collapses navigation on small screens
- **Touch-friendly** - Large tap targets
- **Smooth accordion** - Dropdowns expand/collapse smoothly

## Adding a New Page

Edit `js/nav-config.js`:

### Simple Link (No Dropdown)

```javascript
{
  label: "Page Name",
  href: "/page-path/"
}
```

### Link with Dropdown

```javascript
{
  label: "Section Name",
  href: "#", // Or parent page URL
  dropdown: [
    {
      label: "Sub-page 1",
      href: "/section/sub1/",
      description: "Brief description (optional)"
    },
    {
      label: "Sub-page 2",
      href: "/section/sub2/",
      description: "Another description"
    }
  ]
}
```

### Adding to Existing Dropdown

Find the parent item in `NAV_CONFIG.items` and add to its `dropdown` array:

```javascript
{
  label: "Research",
  href: "#",
  dropdown: [
    // ... existing items ...
    {
      label: "New Research Page",
      href: "/research/new-page/",
      description: "Description of new page"
    }
  ]
}
```

## Customization

### Change Logo

Edit in `nav-config.js`:

```javascript
logo: {
  text: "Your Site Name",
  separator: "|",
  tagline: "Your Tagline",
  href: "/"
}
```

### Change Mobile Breakpoint

Edit in `nav-config.js`:

```javascript
mobileBreakpoint: 768 // Change to your desired pixel width
```

### Style Customization

Edit `css/nav-dropdown.css`:

- **Dropdown width:** `.nav-dropdown { min-width: 280px; }`
- **Dropdown background:** `.nav-dropdown { background: ... }`
- **Hover colors:** `.nav-dropdown-item:hover { ... }`
- **Border colors:** `.nav-dropdown-item { border-left: ... }`

## Active State Behavior

The system automatically highlights:

1. **Current top-level page** - Based on URL path
2. **Current dropdown item** - Exact or prefix match
3. **Parent of active dropdown item** - Shows which section you're in

### Exact Match (Home page only)

```javascript
{
  label: "Home",
  href: "/",
  exact: true  // Only highlights if URL is exactly "/"
}
```

### Prefix Match (All other pages)

Automatically highlights if current URL starts with the link's href.

Example: If you're on `/research/documentation/`, both "Research" and "Documentation" will be highlighted.

## Browser Support

- **Modern browsers:** Full support (Chrome, Firefox, Safari, Edge)
- **IE11:** Partial support (may need polyfills for backdrop-filter)

## Performance

- **Lazy initialization:** Only builds nav once DOM is ready
- **Event delegation:** Efficient event handling
- **CSS transforms:** Hardware-accelerated animations
- **No jQuery:** Vanilla JavaScript for minimal overhead

## Accessibility

- **ARIA labels:** Proper `aria-haspopup`, `aria-expanded` attributes
- **Keyboard navigation:** Tab through links, Enter to activate
- **Focus states:** Visible outline on focus
- **Screen reader friendly:** Semantic HTML with role attributes

## Troubleshooting

### Navigation not appearing

- Check browser console for errors
- Verify `nav-config.js` is loaded before `nav-dropdown.js`
- Ensure `<nav id="main-nav"></nav>` exists in HTML

### Dropdowns not showing

- Check CSS variables are defined
- Verify `nav-dropdown.css` is loaded
- Check z-index conflicts with other elements

### Active states not working

- Check URL paths match exactly (with or without trailing slashes)
- Use `exact: true` for Home page
- Verify href paths in config match actual URLs

### Mobile menu not working

- Check `nav-hamburger` button is rendered
- Verify mobile breakpoint in config
- Check for JavaScript errors in console

## Migration from Old Navigation

### Before (Static HTML in each page)

```html
<nav id="main-nav">
  <div class="nav-inner">
    <a href="/" class="nav-logo">Mindloft | Neurosecurity</a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/classical/">Classical</a></li>
      <!-- ... more links ... -->
    </ul>
  </div>
</nav>
```

### After (Dynamic from config)

```html
<!-- In <head> -->
<link rel="stylesheet" href="/css/nav-dropdown.css">
<script src="/js/nav-config.js"></script>
<script src="/js/nav-dropdown.js"></script>

<!-- In <body> -->
<nav id="main-nav"></nav>
```

All navigation logic is now centralized in `nav-config.js`.

## Future Enhancements

Possible additions (not yet implemented):

- Search integration in navigation
- Breadcrumb generation from config
- Mega-menu support (multi-column dropdowns)
- Icon support for menu items
- Notification badges on links

---

**Version:** 1.0
**Last Updated:** 2026-02-05
**Author:** Kevin Qi (via Claude Opus 4.6)
