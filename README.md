# Feendalus Product Portfolio Homepage

A responsive, dependency-light portfolio homepage that links to the three current Feendalus product pages.

## Included structure

- `index.html` — portfolio homepage
- `styles.css` — homepage design system
- `script.js` — mobile navigation, filters, FAQ and reveal interactions
- `legal-ai-document-management/` — Legal Workspace project
- `woocommerce-ai-platform/` — WooCommerce AI project
- `shopify-ai-platform/` — Shopify Intelligence project

## Adding a new product

1. Create a new project folder beside the existing three product folders.
2. In the homepage `index.html`, duplicate one complete `<article class="product-card ...">` block inside `[data-product-grid]`.
3. Change:
   - the product number
   - `data-category`
   - title and description
   - capability tags
   - destination path
   - accent class or add a new product color class in `styles.css`
4. Update the product count in the toolbar and JSON-LD `ItemList`.

The product cards are written directly in HTML rather than rendered only through JavaScript, preserving crawlable product titles, descriptions and links.

## Expected production URLs

- `/legal-ai-document-management/`
- `/woocommerce-ai-platform/`
- `/shopify-ai-platform/`

The packaged links are relative, so the bundle can be deployed at the domain root.

## CTA convention

Every prominent CTA uses two lines and includes `info@feendalus.com` on the second line, as requested.

## Deployment notes

- Replace the placeholder Open Graph image at `/og/feendalus-products.jpg`.
- Confirm the canonical URL before launch.
- Enable compression, caching and HTTPS at the server/CDN level.
- Add analytics and consent tooling only if required.
