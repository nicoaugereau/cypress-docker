//var shell = require('shelljs');

describe("Telechargement fichier PDF et controle nombre de pages", async () => {
    before (function () {

        //shell.chmod(755, '/Users/nicolasaugereau/Downloads/ci/toto/*')

    })

    after (function () {

    })

    it("Acces au site web", () => {
        cy.visit('https://example.cypress.io')
        cy.contains('type')
    })

})