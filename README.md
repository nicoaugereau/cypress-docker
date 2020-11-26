# Cypress Docker

## Cypress

Lancer les tests .js

    npm run cypress:js

ou

    npm run cypress:test

Lancer les tests .feature

    npm run cypress:feature

## Mocha

    npm run test

## Lancer un Docker

Voir : 
    https://www.mariedrake.com/post/using-docker-to-run-your-cypress-tests
    https://github.com/cypress-io/cypress-docker-images
    https://docs.cypress.io/guides/guides/continuous-integration.html#Docker
    https://docs.cypress.io/examples/examples/docker.html#Images
    https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/
    https://github.com/cypress-io/cypress-docker-images/tree/master/browsers
  

    # Lancer le build la première fois
    docker build -t cypress-test:1.0.0 .

    # Utiliser la commande pour créer le container
    docker run -it --name cypress-test cypress-test:1.0.0
    # Lancer l'exécution pour les fois suivantes (cypress est le nom réutilisé)
    docker start --attach cypress-test
    

    docker run -it -v $PWD:/e2e -w /e2e cypress/base:14

CTRL+D pour terminer

    # Lister les images
    docker images
    # Lister les container
    docker ps -a lists
