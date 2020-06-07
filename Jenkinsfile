#!groovy

    node {
        properties([
            parameters([
                choice(name: 'Environnement', choices: ['localhost', 'r2', 'i1', 'r1', 'r3'], description: 'Environnement sur lequel sont joués les tests')
            ]),
            buildDiscarder(logRotator(artifactDaysToKeepStr: '5', artifactNumToKeepStr: '10', daysToKeepStr: '5', numToKeepStr: '10')),
            pipelineTriggers([cron('H 15 * * 1-5')])
        ])

        stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
            checkout scm
        }

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
        docker.image("cypress/base:12.18.0")
            .inside("-v $WORKSPACE/build/docker-volumes/npm-cache:/.npm " +
                    "-v $WORKSPACE/build/docker-volumes/cypress-cache:/.cache " +
                    "-e PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true " +   
                    "-e HOME=/tmp/home "
            ) 
            {
                stage('Install') {
                    timestamps {
                        ansiColor('xterm') {
                            sh 'rm -Rf reports/ || true'
                            sh 'mkdir -p $HOME'
                            sh 'npm ci'
                            sh 'npm run cypress:verify'
                        }
                    }
                }
                stage('Tests Cypress') {
                    timestamps {
                        ansiColor('xterm') {
                            def testExitCode = sh script: "npm run cypress:${params.Environnement}", returnStatus: true
                            if(testExitCode) {
                                currentBuild.result = 'UNSTABLE'
                            }
                            }
                    }
                }
                junit testResults: '**/reports/**/*.xml', allowEmptyResults: true
            }
    }