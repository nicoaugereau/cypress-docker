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
    }
}   