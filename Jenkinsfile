pipeline {
    agent any

    stages {
        stage('Cloner le code') {
            steps {
                 git branch: 'main', url: 'https://github.com/SophieMoon16/CalculatriceJenkins-main.git'
            }
        }

        stage('Construire et tester') {
            steps {
                    sh 'docker build -t calculatrice .'
                    sh 'docker run --rm calculatrice'
                }
            }
        }

        stage('Déployer en production') {
          steps {
            script {
              try {
                input message: 'Voulez-vous déployer en production ?', ok: 'Oui, déployer'
                sh 'docker run -d --rm -p 5500:8081 calculatrice'
                } catch (err) {
                echo "Déploiement annulé par l'utilisateur 🚫"
                }
                }
            }
        }
}
    

