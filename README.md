# Word Unscrambler

A browser-based word unscrambler built with React, Vite, and Tailwind CSS. It finds words from scrambled letters, supports wildcard tiles, lets users filter results, and groups matching words by length and score.

## Features

- Unscramble letters into valid words
- Wildcard support with `?` and `*`
- Filters for prefix, suffix, contains, and exact length
- Sorting by longest, shortest, A-Z, or score
- Copy individual words or all results
- Remote dictionary support with local fallback generation

## Local development

```bash
npm install
npm run generate:wordlist
npm run dev
```

The generator creates `public/word-list.json` for local fallback use. Production can load the same file from an external hosted URL.

## Tests

```bash
npm run test
```

## Production build

```bash
npm run build
```

## Netlify settings

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

The included [`netlify.toml`](./netlify.toml) already matches these settings.
