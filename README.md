# Flags

Assets map for branded flags.

### Build

```sh
npm run build
```

The flag SVGs will be output to the [](public) folder in both 1x1 and 4x3 aspect ratios, with a JSON map of metadata.

### Running the demo

```sh
npm start
```

A demo server will be available to preview the flag comparisons.

### Publishing new version

Merging to master will cause Travis to run (as long as the commit is not a `chore(release):`
Commits MUST be conventional commits.
Travis will publish the new version to artifactory and push the build to Google Cloud Storage on the prod env in the cdn.brandwatch.com bucket. You'll find the assets at `@vizia-assets`
