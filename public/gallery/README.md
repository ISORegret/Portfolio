# Gallery images (Option 2 – host on your site)

Photos are served from here so your site never hits Pixieset’s 403. Add image files as below, then push to GitHub.

## Folder structure

Each album has a folder under `public/gallery/`. Put images in that folder with these exact names:

| Folder | Cover | Gallery images |
|--------|--------|----------------|
| `morning-motor-events` | `cover.jpg` | `1.jpg` … `5.jpg` |
| `opening-of-the-beaches` | `cover.jpg` | `1.jpg` … `31.jpg` |
| `candid-randoms` | `cover.jpg` | `1.jpg` … `30.jpg` |
| `damespoint` | `cover.jpg` | `1.jpg` … `32.jpg` |
| `wingsanwheels` | `cover.jpg` | `1.jpg` … `12.jpg` |
| `turkeyrodrun` | `cover.jpg` | `1.jpg` … `28.jpg` |
| `car-show` | `cover.jpg` | `1.jpg` … `12.jpg` |
| `architecture` | `cover.jpg` | `1.jpg` … `14.jpg` |
| `justin-blennis` | `cover.jpg` | `1.jpg` … `23.jpg` |

## How to add photos

1. **Export from Pixieset** (or use originals): download each album’s images.
2. **Rename** the cover image to `cover.jpg`. Rename the rest in order to `1.jpg`, `2.jpg`, `3.jpg`, …
3. **Put them in the right folder**: e.g. Turkey Rod Run → `public/gallery/turkeyrodrun/`.
4. **Commit and push** to GitHub. The site will serve them from your domain (no 403).

You can use `.jpg` or `.png`; the app is set up for `.jpg`. If you use `.png`, update the paths in `app/data/projects.ts` (e.g. `cover.png`, `1.png`).
