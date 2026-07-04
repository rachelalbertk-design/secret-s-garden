# The Secret's Garden Prototype

A local-only fairy garden prototype where the visual garden is the home base. The garden objects act as doorways into tarot readings, astrology readings, a daily grimoire journal, gentle rituals, and a Memory Tree day summary.

## Current Features

- Fairy-sized garden hub with clickable object doorways
- Card Altar with daily tarot, countdown, reading archive, fairy deck gallery, and custom deck builder
- Observatory with local daily astrology-style readings
- Grimoire journal with optional same-day sections and past entries
- Tending Grove with short optional garden rituals
- Memory Tree that gathers tarot, astrology, feelings, and ritual work into a daily lesson
- Fairy creation and replayable onboarding with the witch potion intro
- Local-only privacy: no accounts, no ads, no tracking, no backend

## Run Locally

This is a static HTML/CSS/JavaScript prototype. No build step is required.

Open `index.html` directly, or serve the folder locally:

```bash
python -m http.server 4188
```

Then open:

```text
http://127.0.0.1:4188/
```

If Node is available, you can run a syntax check:

```bash
npm run check
```

## Publish On GitHub Pages

This repository is ready to publish from the root folder:

1. Create a new GitHub repository.
2. Add these files to the repository.
3. In GitHub, go to `Settings > Pages`.
4. Choose `Deploy from a branch`.
5. Select the `main` branch and `/root`.
6. Save, then wait for GitHub Pages to publish.

The included `.nojekyll` file helps GitHub Pages serve the static files as-is.

## Privacy Model

The app stores prototype data in the browser's `localStorage` on the current device. It does not send journal entries, readings, custom deck images, or garden state to a server.

To reset the local save in a browser, open:

```text
?resetGarden=1
```

## Project Structure

```text
index.html
styles.css
app.js
assets/
```

## License

No license has been selected yet. Add a `LICENSE` file before publishing if you want to define reuse rights.
