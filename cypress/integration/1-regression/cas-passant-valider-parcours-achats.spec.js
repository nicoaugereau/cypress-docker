/**
 * Cas passant non régression
 */

import { ui } from '../../pages/commun'
import { user } from '../../pages/accueil'

//** INPUTS du cas de test **//
//** -_-_-_-_-_-_-_-_-_-_- **//
const site = 'frontend'
const profil = 'standard'
//** -_-_-_-_-_-_-_-_-_-_- **//

/**
 * describe(name, config, fn)
 * context(name, config, fn)
 * it(name, config, fn)
 * specify(name, config, fn)
 */

context(`Valider un parcours d'achats`, async () => {
  describe('Identification utilisateur standard ', async () => {
    before(function () {
        
    })

    it(`l'utilisateur visite le "front"`, () => {
      ui.web = site
    })

    it(`'utilisateur n'est pas identifié`, () => {
      user.login = profil
    })

    it(`je suis identifié`, () => {
      user.status = 'identifié'
    })
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
