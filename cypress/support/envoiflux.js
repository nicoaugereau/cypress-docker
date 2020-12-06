const { expect } = require("chai")

Cypress.Commands.add('apiAuth', (testCase, linkService, username, password) => {
    //cy.fixture(testCase).then(content => {
        cy.request({
            method: 'POST',
            url: linkService,
            //auth: {}
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: username,
                password: password,
                // content
            }
        })
        .its('body')
        .then(response => {
            expect(response).to.not.be.null
            expect(response.token).to.not.be.null
            cy.log(response)
        })
    //})
})