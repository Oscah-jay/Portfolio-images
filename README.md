# Image Library

A lightweight image asset library built with vanilla HTML, CSS and JavaScript.

## Folder structure

```text
image-library/
├── index.html
├── style.css
├── script.js
└── images/
    ├── projects/
    ├── branding/
    ├── ui-ux/
    └── graphics/
```

## Adding images

1. Put the image into the appropriate folder.
2. Open `script.js`.
3. Add an object to `imageLibrary`.

Example:

```js
{
  name: "Go Cart Dashboard",
  src: "images/projects/go-cart-dashboard.jpg",
  category: "projects"
}
```

You can add as many objects as you need.

## Using an image from your portfolio

When the library is hosted publicly, click an image and press **Copy path**.

The copied URL can be used directly:

```html
<img src="COPIED_URL_HERE" alt="Go Cart Dashboard">
```

Or:

```css
.hero {
  background-image: url("COPIED_URL_HERE");
}
```

## Hosting

This is a static website, so it works well on GitHub Pages, Netlify or Vercel.

If your portfolio is hosted separately, host this image library separately and use its public image URLs from the portfolio.

## Important

A normal browser cannot automatically scan a server folder and discover every image inside it. This version therefore uses `script.js` as a small image manifest. This keeps it fully static and predictable.

For very large libraries, the manifest can later be generated automatically from the folder contents during deployment.
