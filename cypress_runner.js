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

var specs
const cypress = require('cypress')
const yargs = require('yargs')
var shell = require('shelljs');
const { warnHack } = require('./common/tools')
const argv = yargs.scriptName("cypress_runner")
.usage("Usage: $0 -w num -h num")
.example(
"npm run cypress -e internet -b chrome -s js 2-e2e/maaf/adhesion-papier-2a-3p-obtention-decision.spec",
"npm run cypress 2-e2e/maaf/adhesion-papier-2a-3p-obtention-decision.spec"
)
.options({
    'env': {
        alias: 'e',
        describe: "choisir l'environnement de tests",
        default: 'internet',
        choices: ['internet', 'localhost']
    },
    'browser': {
        alias: 'b',
        describe: 'choisir le navigateur',
        default: 'electron',
        choices: ['chrome', 'electron', 'firefox', 'edge']
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

warnHack()

cypress.run({
    env: 'mode=' + argv.env,
    browser: argv.browser,
    spec: specs
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
        shell.exec('npx mocha-custom-reporter -f reports/mocha/*.json -r reports/mochareports -i failedOnly')
    }
}