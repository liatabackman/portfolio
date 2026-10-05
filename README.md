# Lia Tabackman portfolio — portable website

This is the complete static site, including all 18 video loops, thumbnails, styling, and animation code. No ChatGPT login, API keys, package installation, database, or build step is required. This export includes the compact three-column mobile galleries and the larger PDF-style project/role captions.

## Simplest publishing option: Netlify Drop
1. Unzip this archive. Open the resulting folder and confirm index.html is directly inside, next to style.css, script.js, and assets/.
2. Sign in to your own Netlify account at https://app.netlify.com/login.
3. Open https://app.netlify.com/drop and drag in that entire folder (not index.html alone).
4. Set the project's visibility to Public if it defaults to private; remove visitor password protection if enabled.
5. Open the generated netlify.app link in a private/incognito browser window, while logged out. Scroll through the galleries and test the contact links.

No build command is needed. Keep the assets folder intact. All media is included locally and no media URLs depend on ChatGPT.

## GitHub Pages option
1. Create a GitHub repository. A public repository works with GitHub Free. Remember: a public repository exposes the source and bundled media as downloadable files.
2. Upload the CONTENTS of this folder into the repository root, so index.html is at the top level. Include the assets directory. Do not upload only the ZIP file.
3. In Settings > Pages, select Deploy from a branch, then main and /(root), and Save.
4. Wait for publishing and open the Pages URL shown in Settings > Pages.
5. Verify the URL in a logged-out/private browser window and on a phone.

The included .nojekyll file disables Jekyll processing. All local links are relative, so the site also works at a GitHub Pages repository subpath.

## Updating the site
- index.html: introductory text, navigation, results placeholder, contact details.
- script.js: project titles, brands, role credits, clip labels, and playback behavior.
- style.css: typography, color, spacing, and responsive layout.
- assets/: keep filenames unchanged unless you also update the relevant code.

For Netlify manual updates, upload the complete updated folder to the SAME project's Production deploys area. For GitHub Pages, commit changes to the configured branch. Changes to the original ChatGPT-hosted site do not automatically update this independent copy.

The social results section intentionally has no invented analytics. Replace its placeholder when your metrics are ready. These excerpts are silent loops, not full-length videos with sound. Browser autoplay policies may require a tap on Play clip.

## Official documentation
- https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
