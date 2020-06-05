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

// Imports
const cucumber = require('cypress-cucumber-preprocessor').default;
const fs = require('fs-extra');
const path = require('path');
const pdf = require('pdf-parse');

// defind variables
const downloadFolder = '../../reports';
const downloadPath = path.resolve(__dirname, downloadFolder);
console.log(downloadPath);

// get env configuration
function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('./cypress', 'config', `${file}.json`)
  return fs.readJson(pathToConfigFile)
}

// PDF read and write to json function
function pdfparse(pdfName) {
  const pdfPathname = path.join(downloadPath, pdfName)
  console.log('Ecriture fichier PDF :');
  console.log(pdfPathname);
  let databuffer = fs.readFileSync(pdfPathname);
  var obj = { pdf: []};
  pdf(databuffer).then(function(data) {
    obj.pdf.push({
      numpages: data.numpages,
      numpagerender: data.numrender,
      //info: data.info,
      //metadata: data.metadata,
      //version: data.version,
      //text: data.text
    });
    var json = JSON.stringify(obj);

    fs.writeFile(pdfPathname + '.json', json, 'utf8', function(err) {
      if (err) throw err;
      console.log('complete');
    })
  })
}

// Read PDF json file
function pdfreader(pdfName) {
  const pdfPathname = path.json(downloadPath, pdfName + '.json')
  console.log('Lecture fichier PDF :');
  console.log(pdfPathname);
  var content = fs.readFileSync(pdfPathname);
  var data = JSON.parse(content);
  return data.pdf[0].numpages;
}

// Chrome options
const options =  [
  // https://peter.sh/experiments/chromium-command-line-switches/
  //'--crash-test
  //'--disable-2d-canvas-clip-aa', // Disable antialiasing on 2d canvas clips
  //'--disable-gl-drawing-for-tests',
  //'--disable-dev-shm-usage', // ?
  //'--no-zygote', // wtf does that mean ?
  //'--usr-gl=swiftshader', // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader, still needs more testing
  //'--enable-webgl',
  //'--hide-scrolbars',
  //'--mute-audio',
  //'--no-first-run',
  //'--disable-infobars',
  //'--disable-breakpad',
  //'--ignore-gpu-blacklist',
  '--start-maximized', //, '--window-size=1200,900', // see defaultViewport
  //'--user-data-dir=./chromeData, // created in index.js, guess cache folder end up inside too
  '--no-sandbox', // meh but better ressource comsuption
  '--disable-setuid-sandbox', // same
  //'--proxy-server=socks5://127.0.0.1:9050, // tor if needed
  '--ignore-certificate-errors',
  '--noerrdialogs', // Suppresses all error dialogs when present
  '--disable-popup-blocking',
  '--disable-password-generation',
  '--disable-save-password-bubble',
  '--disable-translate',
  '--allow-insecure-localhost', // Enables TLS/SSL errors on localhost to be ignored (no interstitial, no blocking of requests)
  //'--reduce-security-for-testing',
  //'--enable-automation',
]
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const file = config.env.configFile || 'localhost';

  on('file:preprocessor', cucumber());

  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // auto open devtools
      //launchOptions.args.push('--auto-open-devtools-for-tabs')
      //launchOptions.args.push('--start-fullscreen')
      launchOptions.args.push(options)
      // change download directory
      // https://docs.cypress.io/api/plugins/browser-launch-api.html@Change-download-directory
      // https://github.com/cypress-io/cypress/issues/949
      // répertoire de téléchargement par défaut
      launchOptions.preferences.default.profile = { default_content_settings: {popups: 0}}
      launchOptions.preferences.default['download'] = {default_directory: downloadPath}

      // whatever you return here becomes the launchOptions
      return launchOptions;
    }
    if (browser.family === 'firefox') {
      //auto open devtools
      //launchOptions.args.push('-devtools')

      launchOptions.preferences['browser.download.dif'] = downloadPath
      launchOptions.preferences['browser.download.folderList'] = 2
      // needed to prevent download propmt for text/csv files
      launchOptions.preferences['browser.helperApps.neverAsk.saveToDisk'] = 'text/csv';

      return launchOptions;
    }
    if (browser.name === 'electron') {
      // launchOptions.preferences is a 'BrowserWindow' 'options' object
      launchOptions.preferences.fullscreen = false
      launchOptions.preferences.darktheme = true

      //launchOptions.preferences.webPreferences.session = { downloaditem: '/tmp/save.pdf'}
      return launchOptions;
    }
  })

  on('task', {
    downloadFile (args) {
      const cookieheader = args.cookies.map(e => e.name + "=" + e.value).join(";");
      return new Promise((resolve, reject) => {
        const r = request({url: args.url, encoding:null, headers: {Cookie: cookieheader}}, function(err, res, body) {
          if (!res) {
            return reject(new Error("No response"));
          }
          if (res.statusCode !== 200) {
            return reject(new Error("bad status code : " + res.statusCode));
          }
          const sheet = downloadFile.parse(body);
          console.log(JSON.stringify(sheet));
          resolve(sheet);
        });
      });
    }
  });

  on('task', {
    getPdfNumpages (pdfName) {
      pdfparse(pdfName)
      return pdfreader(pdfName)
    }
  })

  return getConfigurationByFile(file)
}
