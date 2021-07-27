# Yoma Mobile :: Prerequisites

## Common Prerequisites

### Minimal system dependencies to run the project

- [Node & NPM](https://nodejs.org/en/):
    1. [install NVM](https://github.com/nvm-sh/nvm)
    1. [install AVN](https://github.com/wbyoung/avn):
       `npm install -g avn avn-nvm avn-n`
    1. install version in `.node-version` file:
       `nvm install <VERSION>` - **Running the
       correct node version is very important**
- [Watchman](https://facebook.github.io/watchman/) :
  ``brew install watchman``
  (for Mac, see docs for alternative installation)
- [CircleCI](https://circleci.com) command line tool :
  on Mac `brew install circleci`
  or [alternative installation](https://circleci.com/docs/2.0/local-cli/#installation)
  
------------

## iOS Prerequisites & Setup

### Minimal system dependencies to run the project

- [Brew](https://brew.sh/)

### Setup

- [Install XCode](https://developer.apple.com/xcode/)

### Install extensions

- Install Pods

    ```bash
    npx pod-install ios
    ```

------------

## Android Prerequisites & Setup

### Setup

1. [Install Android Studio](https://developer.android.com/studio/index.html)
   Including:
    - Android SDK
    - Android SDK Platform
    - Performance (Intel ® HAXM)
    - Android Virtual Device
    - Android NDK (for node integration)

1. Export android environment variables:

    ```bash
    export ANDROID_HOME=/Users/<username>/Library/Android/sdk/
    export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
    ```

1. Setup Emulator
    - Open Android Studio and open this project or start a new project
    - Once Android Studio has finished it's initialization,
      ``AVD Manager`` should be available under ``Tools``
    - Open ``AVD Manager``
    - Click ``create new virtual device``
    - Select target device
    - Download required images
    - ``Finish`` (you should now be able to start the app on the emulator using
      ``npm run android``)

[reference](https://developer.android.com/studio/run/emulator)
