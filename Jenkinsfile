pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = 'C:\\sonar-scanner-7.1.0.4889-windows-x64\\bin'
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

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }

        stage('Release') {
            steps {
                script {
                    // Set your image name and version/tag here
                    def IMAGE = "rubalpret123/smart-library-api"
                    def VERSION = "v${env.BUILD_NUMBER}"

                    // Tag the Docker image and push
                    bat "docker tag smart-library-api:latest %IMAGE%:%VERSION%"
                    bat "docker push %IMAGE%:%VERSION%"
                    bat "docker tag smart-library-api:latest %IMAGE%:latest"
                    bat "docker push %IMAGE%:latest"
                }
            }
        }

        stage('Monitoring') {
            steps {
                bat 'echo Monitoring step running'
            }
        }
    }
}
