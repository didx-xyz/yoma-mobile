const fs = require('fs')
const R = require('ramda')

// get environment to generate from supplied argument:
const env = process.argv[2]
if (!env) {
  console.error('\x1b[31m', 'No environment supplied!')
  console.log('\x1b[33m', 'Please set an environment variable and try again')
  process.exit(1)
}
// get the correct env file
const commonSettings = require('./common.json')
const envSettings = require(`./${env}.json`)

// generate settings object
const settings = R.mergeDeepRight(commonSettings, envSettings)

// create the env.json file in src from both files
fs.writeFileSync('src/env.json', JSON.stringify(settings, undefined, 2))
console.log('\x1b[32m', 'Success! env.json has been generated.')
