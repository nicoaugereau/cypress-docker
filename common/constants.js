
const QUESTION_ENVIRONMENT = {
    type: 'list',
    name: 'environment',
    message: 'Sur quel environnement voulez vous tester le flux ?',
    choices: [
        { name: 'internet', value: 'internet' },
        { name: 'local', value: 'local' }
    ]
}

const QUESTION_MODE_CYPRESS = {
    type: 'list',
    name: 'mode',
    message: 'Sur quel mode de lancement souhaitez vous lancer les tests?',
    choices: [
        { name: 'Mode browser', value: 'open' },
        { name: 'Mode console', value: 'run' }
    ]
}

module.exports = {
    QUESTION_ENVIRONMENT,
    QUESTION_MODE_CYPRESS,
}
