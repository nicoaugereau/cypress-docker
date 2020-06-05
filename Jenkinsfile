#!groovy

enhanceLog {
    node("docker"){
        properties([
            parameters([
                choice(name: 'Environnement', choces: ['localhost', 'r2', 'i1', 'r1', 'r3'], description: 'Environnement sur lequel jouer les tests')
            ]),
            buildDiscarder(logRotator(artifactDayToKeepStr: '', artifactNumToKeepStr: '', dayToKeepStr: '5', numToKeepStr: '10')),
            pipelineTriggers([cron('H 20 * * 1-5')])
        ])

        checkout scm

        // Pour tester en local, lancer à la racine du projet :
        /* docker run -it -u $(id --user):$(id --group) \
                -v $(pwd)/build/docker-volumes/npm-cache:/.npm \
                -v $(pwd)/build/docker-volumes/cypress-cache:/.cache \
                -v $(pwd):/cypress-docker \
                -w /cypress-docker \
                -v $(pwd)/build/docker-volumes/home:/home/node/ \
                -e 'DEBUG=cypress:*' \
                cypress/base:14.0.0 \
                /bin/bash
        */
        docker.image("cypress/base:14.0.0")
            .inside("-v $WORKSPACE/build/docker-volumes/npm-cache:/.npm " +
                    "-v $WORKSPACE/build/docker-volumes/cypress-cache:/.cache " +
                    "-e PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true " +
                    "-e HOME=/tmp/home "
            ) {
                stage('Install') {
                    timestamps {
                        ansiColor('xterm') {
                            sh 'rm -Rf reports/ || true'
                            sh 'mkdir -p $HOME'
                            sh ' npm ci'
                            //sh 'npm run cypress:verify
                        }
                    }
                }
                stage('Tests Cypress') {
                    timestamps {
                        ansiColor('xterm') {
                            sh 'npm run cypress:${params.Environnement}"
                        }
                    }
                }
                junit testResults: '**/reports/**/*.xml, allowEmptyResults: true
            }
    }
}