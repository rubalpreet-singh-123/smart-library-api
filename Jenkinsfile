pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = 'C:\\sonar-scanner-7.1.0.4889-windows-x64\\bin' // Update this if your path is different
    }

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test -- --passWithNoTests'
            }
        }

        stage('Code Quality') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                        bat "\"${env.SONAR_SCANNER_HOME}\\sonar-scanner.bat\" -Dsonar.login=%SONAR_TOKEN%"
                    }
                }
            }
        }

        stage('Security') {
            steps {
                bat 'npm audit --json > audit.json'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }

        stage('Release') {
            steps {
                bat 'echo Release step running'
            }
        }

        stage('Monitoring') {
            steps {
                bat 'echo Monitoring step running'
            }
        }
    }
}
