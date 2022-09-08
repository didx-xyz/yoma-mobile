# Yoma Mobile :: Prerequisites

## Common Prerequisites

### Minimal system dependencies to run the project:
This is a React Native project. Please make sure your environment is setup for the correct React Native version listed in our `package.json`. 
You can find their setup docs here: [Setting up the development environment](https://reactnative.dev/docs/environment-setup).
_Please make sure you you select your operating system and then "Android" for the Target OS._

Once that's complete, please also do the following: 
- [Node & NPM](https://nodejs.org/en/):
    1. Install a node version management package: [install NVM](https://github.com/nvm-sh/nvm)
    1. install the Node version listed in the `.node-version` file in root:
       `nvm install <VERSION>` - **Running the
       correct node version is very important**
- [CircleCI](https://circleci.com)'s command line tool:
    - on Mac `brew install circleci`
    - or [alternative installation](https://circleci.com/docs/2.0/local-cli/#installation)
  
### Nice to haves:
### AVN
AVN is a really helpful little tool that will automatically load the correct Node version based on the `.node-version` file in the root directory. 

[Install AVN](https://github.com/wbyoung/avn) with `npm install -g avn avn-nvm avn-n`. 

Important to Note: Set your Node version to 10 or less BEFORE installing AVN. Once it's installed you can set your Node version to whatever you want and it'll run.

------------

## Android Prerequisites & Setup
If you've followed the setup instructions above, your environment should be setup for React Native Android development.

