// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './envoiflux'

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-xpath')


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

function abortEarly() {
    if (this.currentTest.state === 'failed') {
        debugger
        return cy.task('shouldSkip', true)
    }
    cy.task('shouldSkip').then(value => {
        if (value) this.skip()
    })
}

beforeEach(abortEarly)
afterEach(abortEarly)

before(() => {
    cy.task('resetShouldSkipFlag')
    //Clear downloads folder
    cy.task('clearFolder', 'cypress/downloads')
})

after(() => {
    cy.clearCookies()
})