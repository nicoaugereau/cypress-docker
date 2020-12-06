// Then
import { Then } from 'cypress-cucumber-preprocessor/steps'
import { user } from '../../pages/accueil'

Then("je suis identifié", () => {
    user.status = 'identifié'
})