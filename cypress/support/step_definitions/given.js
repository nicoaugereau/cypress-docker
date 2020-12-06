// Given
import { Given } from 'cypress-cucumber-preprocessor/steps'
import { ui } from '../../pages/commun'
import { user } from '../../pages/accueil'

Given("l'utilisateur visite le {string}", site => {
    ui.web = site
})

Given(`l'utilisateur n'est pas identifié`, () => {
    user.status = 'pas identifié'
})
