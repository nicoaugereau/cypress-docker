/**
 * Cas passant téléchargement pdf et controle pages
 */

/**
 * describe(name, config, fn)
 * context(name, config, fn)
 * it(name, config, fn)
 * specify(name, config, fn)
 */

context(`Télécharger un pdf et contrôler le nombre de pages`, async () => {
    before(function () {
        
    })

    it(`Affichage de la page de conseil pour un bon mot de passe`, () => {
        cy.visit('https://www.economie.gouv.fr/particuliers/se-proteger-demarchage-abusif')
    })

    it(`Téléchargement du fichier pdf`, () => {
        cy.get('.pdf').click()
    })

    it(`je suis identifié`, () => {
    })
})

/*
describe('When in Firefox', {
  browser: 'firefox',
  viewportWidth: 1024,
  viewportHeight: 700,
  env: {
    DEMO: true,
    API: 'http://localhost:9000'
  },
  retries: {
      runMode: 3,
      openMode: 2
    }
}, () => {}
*/
/*
describe('if your app uses jQuery', () => {
  ['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
    it('triggers event: ' + event, () => {
      // if your app uses jQuery, then we can trigger a jQuery
      // event that causes the event callback to fire
      cy
        .get('#with-jquery').invoke('trigger', event)
        .get('#messages').should('contain', 'the event ' + event + 'was fired')
    })
  })
})
*/
