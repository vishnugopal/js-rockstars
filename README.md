This is an example HN app built with:

* [Next.js](https://nextjs.org/)
* [SWR](https://swr.now.sh) for data fetching & infinite scroll.
* [next-offline](https://github.com/hanford/next-offline) for offline caching.
* [Tailwind](https://tailwindcss.com) for styling.

This app scores pretty high on the Lighthouse speed tests, see: [this](./lighthouse-score.png).

## Development

For development:

```bash
npm i
npm run dev
# or
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

## Production Build

For an optimized build (this is the only build that supports offline access):

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Running Tests

```bash
npm run cypress:open
npm run cypress:run
# or
yarn cypress:open
yarn cypress:run
```

## TODO

[x] Simple fetch using SWR (took ~ 1 hour)
[x] Infinite Pagination using useSWRPages() & IntersectionObserver (took ~3 hours)
[x] Offline support using next-offline (took ~3 hours)
[x] Styling using Tailwind (took ~2 hours)
[x] Optimize Pagespeed score (took ~1 hour)
[x] Cypress Testing (took ~1 hour)
[ ] react-testing-library