pipeline {
    agent any

    stages {
        stage('Preparar Ambiente') {
            steps {
                // Acessar o diretório do projeto
                dir('/root/cambauba-backend') {
                    // Parar o aplicativo PM2
                    sh 'pm2 stop cambauba-backend'
                }
            }
        }

        stage('Atualizar Código Fonte') {
            steps {
                // Acessar o diretório do projeto
                dir('/root/cambauba-backend') {
                    // Atualizar o código-fonte do repositório
                    sh 'git pull'
                }
            }
        }

        stage('Instalar Dependências') {
            steps {
                // Acessar o diretório do projeto
                dir('/root/cambauba-backend') {
                    // Instalar as dependências npm
                    sh 'npm install'
                }
            }
        }

        stage('Migrar Banco de Dados') {
            steps {
                // Acessar o diretório do projeto
                dir('/root/cambauba-backend') {
                    // Executar migrações do Prisma
                    sh 'npx prisma db push --force-reset'
                }
            }
        }

        stage('Construir Aplicativo') {
            steps {
                // Acessar o diretório do projeto
                dir('/root/cambauba-backend') {
                    // Executar o comando de construção
                    sh 'npm run build'
                }
            }
        }

        stage('Iniciar Aplicativo') {
            steps {
                // Acessar o diretório do projeto
                dir('/root/cambauba-backend') {
                    // Iniciar o aplicativo PM2
                    sh 'pm2 start cambauba-backend'
                }
            }
        }
    }
}