const inquirer = require('inquirer')
const chalk = require('chalk')
const { exec } = require('child_process')

const { QUESTION_ENVIRONMENT, QUESTION_MODE_CYPRESS } = require('../common/constants')

async function main() {

    const modeChoice = await inquirer.prompt(QUESTION_MODE_CYPRESS)
    const envChoice = await inquirer.prompt(QUESTION_ENVIRONMENT)

    console.log(chalk`
    Lancement de cypress en mode {green ${modeChoice.mode}} sur l'environnement {green ${envChoice.environment.toUpperCase()}}
    `)

    exec(`cypress ${modeChoice.mode} --env mode=${envChoice.environment}`)

    return
}

main()
