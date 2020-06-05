describe("Telechargement fichier PDF et controle nombre de pages", async () => {
    before (function () {

    })

    after (function () {

    })

    it("Acces au site web", () => {
        cy.visit('https://github.com/electron/electron')
        cy.get('.details-overlay > .ml-2')
        .click()

        cy.get('a.flex-1').click('center')
        
    })
})