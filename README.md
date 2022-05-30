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
1. [Pull Requests](docs/pullRequests.md)
1. [Code Style](docs/codeStyle.md)
1. [Contributing](./CONTRIBUTING.md)
1. [Gotchas](docs/gotchas.md)
