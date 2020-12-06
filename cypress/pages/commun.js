/**
 * Fonctions communes aux tests
 */

const { connect } = require('../common/utils')

 // Chargement des timeout configurés globalement
let reqTimeout = Cypress.config('requestTimeout')
let lDelay = Cypress.env('LONG_DELAY')
let mDelay = Cypress.env('MEDIAN_DELAY')
let sDelay = Cypress.env('SHORT_DELAY')

class types {
    /* 
        défini l'action à réaliser : saisie ou controle
    */
    get _controle() {
        this.controle = true
        this.saisie = false
    }
    get _saisie() {
        this.saisie = true
        this.controle = false
    }
}

class uis {
    set web(type) {
        switch(type) {
            case 'front':
            case 'frontend':
                type = 'frontend'
                break
            case 'back':
            case 'backend':
                type = 'backend'
                break
            default:
                type = 'backend'
        }
        const { linkService } = connect(type)
        cy.visit(linkService)
        cy.request({method:'HEAD', url:linkService, failOnStatusCode:false})
        .then(response => {
            expect(response.status).not.eq(503)
        })
    }
    set ws(service) {
        const { linkService } = webservice(service)
    }
}

class controles {}
class clics {}
class titres {}
class breadcrumbs {}
class erreurs {}

var ui = new uis()
var controle = new controles()
var clic = new clics()
var titre = new titres()
var breadcrumb = new breadcrumbs()
var erreur = new erreurs()

module.exports = { types, ui, controle, clic, titre, breadcrumb, erreur }