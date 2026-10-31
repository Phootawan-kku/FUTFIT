# FUTFIT

A 2D 11 v 11 browser football game. No build step and no server needed.

## Run
Double-click `index.html` (Chrome, Edge, Firefox or Safari). An internet connection is only used for the web fonts.

## Controls
Arrow keys move | S short pass (switch player without the ball) | A lob (slide tackle) | W through pass | D shoot (hold) / tackle | Z X C V skill moves | E or Shift sprint | Q switch | B camera | P or Esc pause

## Structure
```
index.html          page markup and script loading order
css/style.css       all styling
assets/logo.svg     game logo
js/config.js        constants, difficulty data, saved settings, shared state
js/audio.js         sound effects and ambience
js/setup.js         player creation, kickoff positions
js/actions.js       kicks, passes, shots, aim assist, shot stats
js/ai.js            CPU player and goalkeeper behaviour
js/physics.js       player movement, ball physics
js/skills.js        skill moves
js/flow.js          kickoff, goals, full time, pause, stats screen
js/menu.js          logo and main menu
js/tournament.js    cup tournament
js/input.js         keyboard input, switching, human controls
js/simulation.js    per-frame simulation step
js/camera.js        camera modes and projection
js/render.js        drawing players, ball, HUD, minimap, scene
js/main.js          main loop and start-up
```
Scripts are plain (non-module) files, so the game also works when opened straight from disk. Load order in `index.html` matters.
