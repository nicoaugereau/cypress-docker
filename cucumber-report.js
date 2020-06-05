const report = require("multiple-cucumber-html-reporter");
var moment = require("moment");
moment.locale('fr');

let projectName = "Cypress Docker";
let projectRelease = "2020.1";
let executionDate = moment().format('LLLL');

report.generate({
    jsonDir: './reports/cucumber/',
    reportPath: './reports/cucumberreports/',
    metadata: {
        browser: {
            name: 'chrome',
            version: '83'
        },
        device: 'Local machine',
        platform: {
            name: 'Mac OS',
            version: 'Catalina'
        }
    },
    customData: {
        title: 'run info',
        data: [
            {label: 'Project', value: projectName},
            {label: 'Release', value: projectRelease},
            {label: 'Execution Date', value: executionDate}
        ]
    }
});