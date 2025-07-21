module.exports = {
  "content": [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
    "./dist/**/*.html"
  ],
  "css": [
    "src/styles/global.css",
    "src/styles/base.css",
    "src/styles/theme.css",
    "src/styles/components.css",
    "src/styles/markdown.css",
    "src/styles/fonts.css"
  ],
  "safelist": [
    {},
    {},
    {},
    {},
    {},
    "dark",
    "light"
  ]
};