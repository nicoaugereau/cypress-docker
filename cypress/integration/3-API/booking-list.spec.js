/**
 * API
 */

import { connectAPI } from '../../common/utils'

//** INPUTS du cas de test **//
//** -_-_-_-_-_-_-_-_-_-_- **//
const apiService = 'restful-booker'
const testCase = 'flux-test.json'
//** -_-_-_-_-_-_-_-_-_-_- **//

/**
 * describe(name, config, fn)
 * context(name, config, fn)
 * it(name, config, fn)
 * specify(name, config, fn)
 */
context(`Compter les réservations`, async () => {
    before(function () {
        
    })

    it(`Authentification au service`, () => {
        const task = 'auth'
        const { linkService, username, password } = connectAPI(apiService, task)
        cy.apiAuth(testCase, linkService, username, password)
    })
    
    it(`Compter les réservations`, () => {
        const task = 'booking'
        const getItems = () =>
            cy.request('https://restful-booker.herokuapp.com/' + task)
            .its('body')

        getItems()
        
        
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
