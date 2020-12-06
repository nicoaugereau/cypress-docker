/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const fs = require('fs-extra')

 // get env configuration
function getConfigurationByFile(environment) {
  // Configuration commune
  const environments = JSON.parse(fs.readFileSync('./config/environments.json'))

  return {
      backend: environments[environment].backend,
      frontend: environments[environment].frontend,
      api:environments[environment].api
  }
}

// Chrome options
const options = [
    /* TODO : https://peter.sh/experiments/chromium-command-line-switches/
      there is still a whole bunch of stuff to disable
    */
    //'--crash-test', // Causes the browser process to crash on startup, useful to see if we catch that correctly
    // not idea if those 2 aa options are usefull with disable gl thingy
    //'--disable-canvas-aa', // Disable antialiasing on 2d canvas
    //'--disable-2d-canvas-clip-aa', // Disable antialiasing on 2d canvas clips
    //'--disable-gl-drawing-for-tests', // BEST OPTION EVER! Disables GL drawing operations which produce pixel output. With this the GL output will not be correct but tests will run faster.
    //'--disable-dev-shm-usage', // ???
    //'--no-zygote', // wtf does that mean ?
    //'--use-gl=swiftshader', // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader, still needs more testing.
    //'--enable-webgl',
    //'--hide-scrollbars',
    //'--mute-audio',
    //'--no-first-run',
    //'--disable-infobars',
    //'--disable-breakpad',
    ////'--ignore-gpu-blacklist',
    '--headless',
    //'--disable-gpu',
    '--start-maximized', //, '--start-maximized','--window-size=1280,900', // see defaultViewport
    //'--user-data-dir=./chromeData', // created in index.js, guess cache folder ends up inside too.
    '--no-sandbox', // meh but better resource comsuption
    '--disable-setuid-sandbox', // same
    // '--proxy-server=socks5://127.0.0.1:9050'] // tor if needed
    '--ignore-certificate-errors',
    '--noerrdialogs', // Suppresses all error dialogs when present
    '--disable-popup-blocking',
    '--disable-password-generation',
    '--disable-save-password-bubble',
    '--disable-translate',
    '--allow-insecure-localhost' // Enables TLS/SSL errors on localhost to be ignored (no interstitial, no blocking of requests).
    //'--reduce-security-for-testing',
    //'--enable-automation',
]

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

    const cucumber = require('cypress-cucumber-preprocessor').default
    on('file:preprocessor', cucumber())

    on('before:browser:launch', (launchOptions, browser = {}) => {
      if (browser.family === 'chromium' && browser.name !== 'electron') {
          // auto open devtools
          //launchOptions.args.push('--auto-open-devtools-for-tabs')
          //launchOptions.args.push('--start-fullscreen')
          launchOptions.args.push(options)
          // change download directory
          // https://docs.cypress.io/api/plugins/browser-launch-api.html#Change-download-directory
          // https://github.com/cypress-io/cypress/issues/949
          // répertoire de téléchargement par défaut
          launchOptions.preferences.default.profile = { default_content_settings: { popups: 0 } }
          launchOptions.preferences.default['download'] = { default_directory: downloadPath }

          // whatever you return here becomes the launchOptions
          return launchOptions
      }

      if (browser.family === 'firefox') {
          // auto open devtools
          //launchOptions.args.push('-devtools')
          launchOptions.preferences['browser.download.dir'] = downloadPath
          launchOptions.preferences['browser.download.folderList'] = 2
          // needed to prevent download prompt for text/csv files.
          launchOptions.preferences['browser.helperApps.neverAsk.saveToDisk'] = 'text/csv'

          return launchOptions
      }
      if (browser.name === 'electron') {
          // launchOptions.preferences is a `BrowserWindow` `options` object
          launchOptions.preferences.fullscreen = false
          launchOptions.preferences.darkTheme = true

          //launchOptions.preferences.webPreferences.session = { downloaditem :'/tmp/save.pdf'}
          launchOptions.preferences.webPreferences.session = { downloaditem: downloadPath }
          //console.log(launchOptions.preferences)
          return launchOptions
      }
  })

  let shouldSkip = false
    on('task', {
        resetShouldSkipFlag() {
            shouldSkip = false
            return null
        },
        shouldSkip(value) {
            if (value != null) shouldSkip = value
            return shouldSkip
        }
    })

    on('task', {
      clearFolder(folder) {
          const opsys = process.platform
              fs.emptyDirSync(folder)
          return [opsys, folder]
      }
  })

  // accept a `mode` value from commande line or use development by default
  const file = config.env.mode || 'local'
  return getConfigurationByFile(file)
  
}
