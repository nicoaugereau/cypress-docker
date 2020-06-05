// mochawesome reporter
/* utiliser .mocharc.js ou options a mettre dans cypress.json ou utiliser reporterOptions.json
    reporter: "mochawesome",
    "reporter-option": [
        "reportDir=reports/",
        "timestamp=ddmmyyyy_HHMMss",
        "quite=true",
        "overwrite=false",
        "html=false",
        "json=true"
    ]
*/

module.exports = {
    reporter: "./mocha-multiple-reporters.js",
    "reporter-option": [
        "reportDir=reports/",
        "timestamp=ddmmyyyy_HHMMss",
        "quite=true",
        "overwrite=false",
        "html=false",
        "json=true"
    ]
}