[![Build status](https://build.appcenter.ms/v0.1/apps/4db1e1a9-cbf3-4f9f-80ca-8159a1fa1883/branches/develop/badge)](https://appcenter.ms)
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
