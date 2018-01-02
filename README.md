Game Elements
---

Elements of an RPG built with MelonJS.

Requires:

- node 5+
- npm
- https://github.com/Vandise/melonjs-composable-sprites

## What is this repository?
This project demonstrates various RPG elements utilizing MelonJS in a plugin-based architecture. Many aspects are being developed: scripted scenes, items, equipment, animations, battles, NPC's, environment effects, and much more.

![](https://media.giphy.com/media/3o7526MveezG4X1PBm/giphy.gif)

## How this repository is set up

This repository is configured to automate some processes with developing a game with MelonJS and ES6. The only additional aspects that need to be completed manually is utilizing some ES6 libraries provided via my Git repositories (see requirements above). These can be extracted and compiled in `lib/ext`.

When these melonJS libraries ("plugins") are mature enough, they can be installed via NPM and imported.

## What's currently available?
Currently implemented:

- Some effects
- Composable sprites (equipment)
- Some scene concepts (https://github.com/Vandise/melonjs-scenes)
- Admin panel (press "p" to access it)
- Stat calculations

## License
MIT
