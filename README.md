# CMedical

- [CMedical Norge](https://cmedical.no/no)
- [CMedical Sverige](https://cmedical.no/se)
- [CMedical Europe](https://cmedical.no/en)
- [Sanity Studio](https://cmedical.no/studio)

## Development

Copy `.env.template` to `.env.local` and add secrets.
Secrets are available in BitWarden and in Vercel environment variable settings.

Run these commands:
- `npm install`
- `npm run dev`

Sanity Studio is now available on http://localhost:3000/studio and the website on http://localhost:3000

## Migrations

See [migrations/README.md](migrations/README.md)

## External booking services for Norwegian clinics

### Metodoka

Settings page: https://ws.metodika.com/skalpell/ws/wb3/settings.php

Login details are in Bitwarden.

### Pasientsky

Admin page: https://portal.pasientsky.no/

Requires BankID to log in. CMedical must give you access.

The only settings we are interested in on this page are the injected scripts
which can be found in Konfigurasjon og innstillinger > Timebok > Innstillinger > Ekstern bookingside
