updateGitlabCommitStatus state: 'pending'

pipeline {
    // Makes our pipeline run on any node
    // agent any
    agent {
        //agent direct tells jenkin to allocate an executor and workspace for the pipeline.
        //by default, this directive also makes sure the source repository is checked out.
        label 'master'
    }

    options {
        //pipeline specific options
        //this method is available via the gitLab plugin
        //plugin url: https://plugins.jenkins.io/gitlab-plugin/
        //gets the gitlab connection name from the Jenkins Global configuration file
        gitLabConnection('gitlab')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        //https://www.jenkins.io/doc/book/pipeline/syntax/#environment
        //specifies key:value pairs which will be defined as environment variables for all steps, or stage specific steps, depending on where the environemnt
        GOOGLE_APPLICATION_CREDENTIALS = '/root/key.json'
        KUBECONFIG = '/root/.kube/kubeconfig.yaml'
        NX = credentials('enablement-nexus')
        IMG_ENV = ''
    }
    stages  {
        stage('build') {
             //will happen for all branches since no expression set
             //all branches, master, develop, release
            steps {
                script {
                    try {
                        sh 'npm install'
                        sh 'npm run build'
                        updateGitlabCommitStatus name: 'Test', state: 'success'
                    } catch (exec) {
                        updateGitlabCommitStatus name: 'Test Failed', state: 'failed'
                        throw exec
                    }
                }
            }
        }
        stage('test') {
            //don't want release, don't want master, production
            when {
                expression {
                     return !(env.GIT_BRANCH ==~ /origin\/(develop|release|master|production)/)
                }
            }
            steps {
                script {
                    try {
                        sh 'npm install'
                        sh 'npm run test'
                        sh 'npm run coverage'
                        updateGitlabCommitStatus name: 'Test', state: 'success'
                    } catch (exec) {
                        updateGitlabCommitStatus name: 'Test Failed', state: 'failed'
                        throw exec
                    }
                }
            }
        }

        stage('sonar & QA') {
            //don't want release, dont' want master, production
            when {
                expression {
                    return !(env.GIT_BRANCH ==~ /origin\/(develop|release|master|production)/)
                }
            }
            steps {
                script {
                    try {
                        sh 'npm install sonar-scanner'
                        withSonarQubeEnv('Sonar_GCP'){
                            sh 'npm run sonar'
                        }
                        timeout(time: 5, unit: 'MINUTES') {
                            // sleep is only a temporary fix to a bug
                            sleep(10)
                            waitForQualityGate abortPipeline: true
                        }                        
                    } catch (exec) {
                        updateGitlabCommitStatus name: 'Test Failed', state: 'failed'
                        throw exec
                    }
                    updateGitlabCommitStatus name: 'sonar', state: 'success'
                }
            }
        }

        stage("merge-code") {
            //release, master branches will work here as well....question:
            //I don't think this is necessary for release | production | master because we are not checking rebase ... right now it is just sending
            //accept the MR back to gitlab
            //if release and master do need the rebase stage, then yes, we can have this stage
            when {
                expression {
                    return !(env.GIT_BRANCH ==~ /origin\/(develop|release|production|master)/)
                }
            }
            steps {
                acceptGitLabMR()
            }
        }

//         stage("copy production to master") {
//             when {
//                 expression {
//                     return env.GIT_BRANCH ==~ 'origin/production'
//                 }
//             }
//             steps {
//                 script {
//                 try {
//                         sh 'git pull && git checkout master && git merge production && git add . && git commit -m "Jenkins copy production to master" && git push'
//                         updateGitlabCommitStatus name: 'copy production to master', state: 'success'
//                     } catch (exec) {
//                         // this is so we can capture the results in 'finally' below
//                         updateGitlabCommitStatus name: 'copy production to master', state: 'failed'
//                         throw exec
//                     }
//
//                 }
//             }
//         }


        stage("setup IMG_ENV variable for Docker, GKE") {
            when {
                expression {
                    return env.GIT_BRANCH ==~ /origin\/(develop|release|production)/
                }
            }
            steps {
                script {
                    switch(env.GIT_BRANCH) {
                        case 'origin/develop' : IMG_ENV = 'dev'; break;
                        case 'origin/release' : IMG_ENV = 'release'; break;
                        case 'origin/production' : IMG_ENV = 'prod'; break;
                        default: break;
                    }
                }
            }
        }



        stage("build-image") {
             //we want develop|release|production branches to build image
            when {
                expression {
                    return env.GIT_BRANCH ==~ /origin\/(develop|release|production)/
                }
            }
            steps {
                sh "docker build . -t enablementprojects/flow-enablement-ui-$IMG_ENV:latest"
            }
        }

        stage("push-image") {
            //we want develop|release|production branches to push image
            when {
                expression {
                    return env.GIT_BRANCH ==~ /origin\/(develop|release|production)/
                }
            }
            steps {
                sh "docker push enablementprojects/flow-enablement-ui-$IMG_ENV"
            }
 	    }

        stage("deploy-image") {
             //we want develop|release|production branches to deploy image
            when {
                expression {
                    return env.GIT_BRANCH ==~ /origin\/(develop|release|production)/
                }
            }
            steps {
                sh "kubectl rollout restart deployment/flow-enablement-ui-$IMG_ENV  --namespace=flow"
            }
         }
    }

    post {
        always {
            // Cleans the workspace - so Jenkins will run fast and efficiently
            cleanWs()
        }
        success {
            updateGitlabCommitStatus state: 'success'
        }
        failure {
            updateGitlabCommitStatus state: 'failed'
        }
    }
}
