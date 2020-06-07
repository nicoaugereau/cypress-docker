
pipeline {
    agent { docker { image 'node:12.18.0' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}