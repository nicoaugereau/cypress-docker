pipeline {
    agent { dockerfile true }
    stages {
        stage('Env') {
            steps {
                sh "echo $WORKSPACE"
            }
        }
        stage('Install') {
            steps {
                sh 'pwd'
                sh 'node --version'
                sh 'svn --version'
                sh 'rm -Rf reports/ || true'
                sh 'mkdir -p $HOME'
                sh 'npm ci'
                sh 'npm run cypress:verify'
            }
        }
        stage('Tests Cypress') {
            steps {
                sh script: "npm run cypress:${params.Environnement}"
            }
        }
        publishHTML (target: [
            allowMissing: true,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'reports/mochareports',
            reportFiles: 'reports.html',
            reportName: "Mochawesome Tests Report"
        ])]
        publishHTML (target: [
            allowMissing: true,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'reports/cucumberreports',
            reportFiles: 'index.html',
            reportName: "Cucumber Tests Report"
        ])
    }
}   