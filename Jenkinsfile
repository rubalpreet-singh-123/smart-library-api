pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = 'C:\\sonar-scanner-7.1.0.4889-windows-x64\\bin'
        IMAGE = 'rubalpret123/smart-library-api'
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

        stage('Build Docker Image') {
            steps {
                // Build your Docker image with both 'latest' and build number tags
                bat "docker build -t %IMAGE%:latest -t %IMAGE%:%BUILD_NUMBER% ."
            }
        }

        stage('Push Docker Image') {
            steps {
                // Push both tags to Docker Hub
                bat "docker push %IMAGE%:latest"
                bat "docker push %IMAGE%:%BUILD_NUMBER%"
            }
        }

        stage('Deploy') {
            steps {
                // Deploy using docker-compose or your preferred method
                bat 'docker-compose up -d --build'
            }
        }

        stage('Release') {
            steps {
                // Optionally, you can add more release logic or notifications here
                bat 'echo Release complete'
            }
        }

        stage('Monitoring') {
            steps {
                bat 'echo Monitoring step running'
            }
        }
    }

    post {
        failure {
            bat 'echo Build failed!'
        }
        always {
            bat 'docker logout'
        }
    }
}
