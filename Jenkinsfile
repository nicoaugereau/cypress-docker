pipeline {
    agent { dockerfile true }
    stages {
        stage('Env') {
            steps {
                sh "echo $WORKSPACE"
            }
        }
        stage('Test') {
            steps {
                sh 'pwd'
                sh 'node --version'
                sh 'svn --version'
            }
        }
        publishHTML (target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'reports/mochareports',
                    reportFiles: 'reports.html',
                    reportName: "Mochawesome testsReport"
                ])
                publishHTML (target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'reports/cucumberreports',
                    reportFiles: 'index.html',
                    reportName: "Cucumber testsReport"
                ])
    }
}   