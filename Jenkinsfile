pipeline {
  agent any

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
    withSonarQubeEnv('SonarQube') {
      withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
        bat "\"${tool 'SonarScanner'}\\bin\\sonar-scanner.bat\" -Dsonar.login=%SONAR_TOKEN%"
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
