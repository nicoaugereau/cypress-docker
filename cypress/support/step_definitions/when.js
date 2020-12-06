// When
import { When } from 'cypress-cucumber-preprocessor/steps'
import { user } from '../../pages/accueil'

/*
 * Flux
 */
When(`je m'identifie avec un profil {string}`, (profil) => {
    user.login = profil
})
