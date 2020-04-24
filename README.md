This is an example of how to make a lot of JS tooling play well together:

* [Next.js](https://nextjs.org/)
* [SWR](https://swr.now.sh) for data fetching & infinite scroll.
* [next-offline](https://github.com/hanford/next-offline) for offline caching.
* [Tailwind](https://tailwindcss.com) for styling.
* [Cypress](https://www.cypress.io) for end-to-end testing.
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for component unit testing.
* [Storybook](https://storybook.js.org) for developing components in isolation.
* [Destiny](https://www.npmjs.com/package/destiny) the prettier for filesystems.

This app also scores pretty high on the Lighthouse speed tests, see: [this](./lighthouse-score.png).

[Suggestions welcome](https://github.com/vishnugopal/js-rockstars/issues/new) on what more to add to this!

## Development

For development:

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

## Production Build

For an optimized build (this is the only build that supports offline access):

```bash
yarn build
yarn start
```

## Running Tests

React-testing-library unit tests can be run by:

```bash
yarn test
```

Cypress integration tests can be run using:

```bash
yarn cypress:open
yarn cypress:run
```

## Storybook

Storybook support is available to test components in isolation:

```bash
yarn storybook
```

## Destiny

This will automatically organize your src/ folder, no decision needed from you!

```bash
yarn destiny
```

## Changelog

- [x] Use destiny for logical filesystems
- [x] Rename to js-rockstars
- [x] Upgrade to latest react and swr 0.2.0
- [x] Storybook knobs
- [x] Storybook support (~2 hours)
- [x] react-testing-library (~ 2 hours)
- [x] right-align and increase width for number field. (~ 15 minutes)
- [x] Fix Ask HN not displaying links bug (~ 10 minutes)
- [x] Cypress Testing (took ~1 hour)
- [x] Optimize Pagespeed score (took ~1 hour)
- [x] Styling using Tailwind (took ~2 hours)
- [x] Offline support using next-offline (took ~3 hours)
- [x] Infinite Pagination using useSWRPages() & IntersectionObserver (took ~3 hours)
- [x] Simple fetch using SWR (took ~ 1 hour)

## Todo

- [ ] Server-side data fetching (SSR)