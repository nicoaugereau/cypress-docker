pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
                sh 'pwd'
                sh 'node --version'
                sh 'svn --version'
            }
        }
    }
}   