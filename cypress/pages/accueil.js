// Page accueil

const { types } = require('./commun')

let reqTimeout = Cypress.config('requestTimeout')
let lDelay = Cypress.env('LONG_DELAY')
let mDelay = Cypress.env('MEDIAN_DELAY')
let sDelay = Cypress.env('SHORT_DELAY')

class users extends types {

    set status(userStatus) {
        switch(userStatus){
            case 'identifié':
                cy.get('.bm-burger-button > button', {timout: reqTimeout})
                .click()
                .then(() => {
                    cy.get('.bm-menu').should('be.visible')
                })
                cy.get('#logout_sidebar_link', {timout: reqTimeout}).should(($el) => {
                    expect($el.text()).include('Logout')
                })
                cy.get('#login-button', {timout: reqTimeout}).should('not.exist')
                break
            default:
                cy.get('#login-button', {timout: reqTimeout})
                .should('be.visible')
        }
    }

    set login(profil) {
        switch(profil) {
            case 'standard':
                cy.get('[data-test=username]')
                .focus()
                .type('standard_user')
                break
            case 'bloqué':
                cy.get('[data-test=username]')
                .focus()
                .type('locked_out_user')
                break
        }
        cy.get('[data-test=password]')
        .focus()
        .type('secret_sauce')
        cy.get('#login-button').click()
    }
}

var user = new users()

module.exports = { user }