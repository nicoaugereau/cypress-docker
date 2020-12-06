// Utils

// Lecture des données de tests utilisateurs
//const { users } = require('../../config/users.json')


const connect = (ui) => {
    const linkService = Cypress.config(ui)
    return { linkService }
}

const connectAPI = (apiService, task) => {
    const { services } = require('../../config/users.json')
    const linkService = Cypress.config('api') +  task
    const { username, password } = services[apiService]
    return { linkService, username, password }
}

module.exports = {
    connect, connectAPI
}