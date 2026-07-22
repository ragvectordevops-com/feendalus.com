# Security headers

The package includes equivalent security-header configurations for common static hosts:

- `.htaccess` for Apache/cPanel hosting
- `_headers` for Netlify or Cloudflare Pages-style deployments
- `vercel.json` for Vercel

Deploy only the configuration that applies to the hosting platform. The policy currently permits same-origin assets, the inline JSON-LD and small inline styles already used by the product pages, `mailto:` links, and HTTPS images. Re-test the site after adding any analytics, forms, external fonts, CDNs or embedded media because the Content Security Policy must then be updated deliberately.

Current CSP:

```text
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' mailto:; img-src 'self' data: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests
```

HSTS includes subdomains. Remove `includeSubDomains` before deployment if any Feendalus subdomain is not available over HTTPS.
