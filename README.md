# Personal Website

This is my personal website.

## CI & Server Setup

Domain is registered through Namecheap.

Hosting is through Cloudflare Pages (static site, project name `personalwebsite`).

## Developing

Pre-reqs:

1. NPM and NodeJS
2. Python3

Running:

1. Clone the repository
2. Run `npm install`
3. Run `npm run build`
4. Server the `www` directory as the root directory of a webserver (`python3 -m http.server`)

## Deploying

Deploying is done through Github Actions (`.github/workflows/build_frontend.yml`). Explained:

- On every push/PR to `master`, GHA runs `npm ci` and `npm run build`
- On pushes to `master`, GHA uploads the built `www/` directory to Cloudflare Pages via `wrangler pages deploy`
- `www/` is entirely build output (gitignored, wiped by `npm run clean`): HTML from `src/client/views`, CSS from `src/client/sass`, JS bundles in `www/dist`, and static files copied from `src/static`. Nothing else gets deployed.
- Before deploying, CI fails if the build changed any file in the working tree, and it logs the exact list of files being uploaded
- Wrangler is a pinned dependency in `package-lock.json`, so the deploy step doesn't install anything during the deploy
- Cloudflare Pages serves `foo.html` at `/foo` and uses `404.html` for missing pages automatically

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN` - API token with the `Account > Cloudflare Pages > Edit` permission
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID

Manual deploy from a local machine: `npm run build && npx wrangler pages deploy www --project-name=personalwebsite --branch=master`

To add a static file (image, robots.txt, etc.), put it under `src/static/`; it's served at the same path relative to the site root.

## Adding a View

Too hands on, can automate this.

1. Add `.hbs` file in `/views` directory
2. Add link to URL in the `header.hbs` file
3. Add compilation file to `build.js` file
4. (If Javascript) Add compilation info to Rollup

All of this could 100% be automated away.


## TODO

* Easy to write things
* Flexible frontend, can make experiments

* timedistance / worldbuilder continue to work and are ported

* No scss


Things to change about existing site:

* Colors
* Favicon (do pixel art yo)
* Link to my itch.io projects
* Simplify header
* `lafferty.dev` in the top left should be a link to the homepage
* rename `dnd worldbuilder` to `Region Generator`

* Fix scroll down changing the color of the footer

* delete medieval demographics page
* delete or rewrite clock tracker


* inline all unpkg stuff, host scripts directly