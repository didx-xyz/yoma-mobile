[![CircleCI](https://dl.circleci.com/insights-snapshot/gh/didx-xyz/yoma-mobile/develop/deploy-android-alpha/badge.svg?window=30d)](https://app.circleci.com/insights/github/didx-xyz/yoma-mobile/workflows/deploy-android-alpha/overview?branch=develop&reporting-window=last-30-days&insights-snapshot=true)
# Yoma Mobile App

## Available commands

to see a list of available commands run:

```bash
npm run help
```

## Quick Start (iOS)

1. go through all the iOS Prerequisites in [Prerequisites](docs/prerequisites.md)
1. ``npm i`` install NPM dependencies
1. ``npx pod-install`` install all pods
1. ``npm run make_env:dev`` set up the environment file with dev values.
    > **Alternatively** - ``npm run init`` - runs the first 3 commands in one go.
1. ``npm run start`` start bundler
1. ``npm run ios`` start app

## Quick Start (Android)

1. go through all the Android Prerequisites in [Prerequisites](docs/prerequisites.md)
1. ``npm i`` install NPM dependencies
1. ``npm run make_env:dev`` set up the environment file with dev values
    > **Alternatively** - ``npm run init`` - runs these commands (and installs ios pods) in one.
1. ``npm run start`` start bundler
1. ``npm run android`` start app

## Contributing

Before contributing please read through everything in [Contributing](./CONTRIBUTING.md)

## Testing

```bash
npm run test
npm run test:watch
```

## Additional Docs

1. [Prerequisites](docs/prerequisites.md)
2. [Pull Requests](docs/pullRequests.md)
3. [Code Style](docs/codeStyle.md)
4. [Contributing](./CONTRIBUTING.md)
5. [Gotchas](docs/gotchas.md)
