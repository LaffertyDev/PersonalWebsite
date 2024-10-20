# Personal Website

This is my personal website.

## CI & Server Setup

Domain is registered through Namecheap.

Hosting is through Digital Ocean

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

Deploying is done through Github Actions. Explained:

- GHA will SSH into my Digital Ocean box (using private SSH Keys)
- GHA will sync the /opt/personalwebsite directory
- NGINX will see the changes and update accordingly, serving out of the /

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