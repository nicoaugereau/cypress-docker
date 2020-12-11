/** 
 * Cypress runner for Jenkins
 * 
 * Command : npm run cypress <env> <spec> <browser> [option: test]
 * 
 * https://medium.com/cypress-io-thailand/generate-a-beautiful-test-report-from-running-tests-on-cypress-io-371c00d7865a
 */
const v8 = require('v8');
const totalHeapSize = v8.getHeapStatistics().total_available_size;
const totalHeapSizeGb = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);
console.log('totalHeapSizeGb: ', totalHeapSizeGb);

var specs, configOptions = {}, device
const cypress = require('cypress')
const yargs = require('yargs')
const shell = require('shelljs');
const screenSize = require('./config/screensize.json')
const { warnHack } = require('./common/tools')
const argv = yargs.scriptName("cypress_runner")
.usage("Usage: $0 -e [environnement] -b [browser] -v [viewport] -m [mode] -s [spec]")
.example(
"npm run cypress -e r1 -b chrome -s js 2-e2e/maaf/adhesion-papier-2a-3p-obtention-decision.spec")
.options({
    'env': {
        alias: 'e',
        describe: "choisir l'environnement de tests",
        default: 'r2',
        choices: ['i1', 'r1', 'r2', 'r3']
    },
    'browser': {
        alias: 'b',
        describe: 'choisir le navigateur',
        default: 'electron',
        choices: ['chrome', 'electron', 'firefox', 'edge']
    },
    'viewport': {
        alias: 'v',
        describe: 'résolution écran souhaitée pour les tests',
        default: 'défaut',
        choices: ['défaut', 'ipad-5', 'ipad-6', 'ipad-7', 'ipad-8', 'ipad-pro-2', 'ipad-pro-3', 'ipad-pro-4', 'ipad-mini-5', 'iphone-5', 'iphone-5s', 'iphone-6', 'iphone-6s', 'iphone-6+', 'iphone-7', 'iphone-8', 'iphone-x', 'iphone-xr', 'iphone-se2', 'iphone-11', 'iphone-12', 'macbook-11', 'macbookair-11', 'macbook-12', 'macbook-13', 'macbookair-13', 'macbook-15', 'macbook-16', 'macbookpro-13-retina', 'macbookpro-15', 'macbookpro-15-retina', 'macbookpro-17', 'chromebook', 'google-pixel', '720p', '1080p', '1080i']
    },
    'mode': {
        alias: 'm',
        describe: 'orientation affichage écran : défaut, portrait ou paysage',
        default: 'défaut',
        choices: ['défaut','portrait', 'paysage']
    },
    'spec': {
        alias: 's',
        describe: 'format des tests exécutés',
        default: 'js',
        choices: ['js', 'feature']
    }
}).help()
  .argv

const reportJsonFiles = `reports/**/*.json`
const reportXMLFiles = `reports/*.xml`
// delete all existing report files
shell.rm('-rf', reportJsonFiles)
shell.rm('-rf', reportXMLFiles)

if (argv._ != '') {
    specs = 'cypress/integration/' + argv._ + '.' + argv.spec
} else {
    specs = 'cypress/integration/**/*.' + argv.spec
}

if (argv.viewport != '') {
    if (screenSize.sizes.hasOwnProperty(argv.viewport)) {
        if (argv.mode != '') {
            switch(argv.mode) {
                case 'portrait':
                    //configuration = 'viewportWidth=' + screenSize.sizes[argv.viewport].viewportWidth + ',viewportHeight=' + screenSize.sizes[argv.viewport].viewportHeight
                    configOptions = {
                        userAgent: screenSize.sizes[argv.viewport].useragent,
                        viewportWidth: screenSize.sizes[argv.viewport].viewportWidth,
                        viewportHeight: screenSize.sizes[argv.viewport].viewportHeight
                    }
                    break
                case 'paysage':
                    //configuration = 'viewportWidth=' + screenSize.sizes[argv.viewport].viewportHeight + ',viewportHeight=' + screenSize.sizes[argv.viewport].viewportWidth
                    configOptions = {
                        userAgent: screenSize.sizes[argv.viewport].useragent,
                        viewportWidth: screenSize.sizes[argv.viewport].viewportHeight,
                        viewportHeight: screenSize.sizes[argv.viewport].viewportWidth
                    }
                    break
                default:
                    //configuration = 'viewportWidth=' + screenSize.sizes[argv.viewport].viewportWidth + ',viewportHeight=' + screenSize.sizes[argv.viewport].viewportHeight
                    configOptions = {
                        userAgent: screenSize.sizes[argv.viewport].useragent,
                        viewportWidth: screenSize.sizes[argv.viewport].viewportWidth,
                        viewportHeight: screenSize.sizes[argv.viewport].viewportHeight
                    }
            }
            device = argv.viewport + ' / ' + configOptions
        } else {
            // si viewport trouvé mais sans mode, mode par défaut du device
            //configuration = 'viewportWidth=' + screenSize.sizes[argv.viewport].viewportWidth + ',viewportHeight=' + screenSize.sizes[argv.viewport].viewportHeight
            configOptions = {
                userAgent: screenSize.sizes[argv.viewport].useragent,
                viewportWidth: screenSize.sizes[argv.viewport].viewportWidth,
                viewportHeight: screenSize.sizes[argv.viewport].viewportHeight
            }
            device = argv.viewport + ' / ' + configOptions
        }
    } else {
        // si viewport non trouvé, mode par défaut
        //configuration = 'viewportWidth=1280,viewportHeight=720'
        configOptions = {
            viewportWidth: 1280,
            viewportHeight: 720
        }
    }
} else {
    // Si viewport non renseigné, mode par défaut
    configOptions = {
        viewportWidth: 1280,
        viewportHeight: 720
    }
}

warnHack()

cypress.run({
    env: 'configFile=' + argv.env,
    browser: argv.browser,
    spec: specs,
    config: configOptions
}).then(() => {
    generateReport(argv.spec)
}).catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
})

function generateReport(options) {
    shell.mkdir('-p', 'reports/mochareports')
    if (options =='js') {
        //shell.exec('npx mochawesome-merge reports/mocha/*.json > reports/mochareports/report.json')
        //shell.exec('npx marge reports/mochareports/report.json -f report -o reports/mochareports')
        shell.exec('npx mocha-custom-reporter -f reports/mocha/*.json -r reports/mochareports -i failedOnly')
    } else {
        shell.mkdir('-p', 'reports/cucumberreports')
        shell.exec('node ./cucumber-report.js')
        //shell.exec('npx mochawesome-merge reports/mocha/*.json > reports/mochareports/report.json')
        //shell.exec('npx marge reports/mochareports/report.json -f report -o reports/mochareports')
        shell.exec('npx mocha-custom-reporter -f reports/cucumber/*.json -r reports/cucumberreports -i failedOnly')
    }
}