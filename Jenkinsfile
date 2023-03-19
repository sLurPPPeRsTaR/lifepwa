library('jenkins-shared-library') _
pipeline {
    agent none
    stages {
        stage('build/scan-sast') {
         parallel {
        stage ("security-fortify-scan") {
          agent {
            node {
              label 'sast'
            }
          }
          environment {
            fortify_app_name = 'customerPortalWeb'
            fortify_app_version = '1.0'
          }
          steps {
            withCredentials([string(credentialsId: '14b7283c-954f-49c2-946e-c7d289f3d3e1', variable: 'fortify_token')]) {
                sh '''
                set +x
                  echo "=================================================="
                  echo "========--- SAST - Fortify Scan: Start ---========"
                  echo "=================================================="
                  scancentral -url https://fortifysast.ifg-life.id:8443/scancentral-ctrl start \
                              -snm \
                              -bt none \
                              -upload \
                              -uptoken $fortify_token \
                              -version ${fortify_app_version} \
                              -application ${fortify_app_name}
                  echo "=================================================="
                  echo "=========--- SAST - Fortify Scan: End ---========="
                  echo "===TO VIEW THE RESULT VISIT https://fortifyssc.ifg-life.id:8443/ssc==="
                  '''
                script {
                  if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'release') {
                    nexus='release'
                  } else if (env.BRANCH_NAME == 'uat') {
                    nexus='stage-release'
                  } else if (env.BRANCH_NAME == 'development') {
                    nexus='build'
                  }

                  sh '''
                  echo "==========================================================================================================================================="
                  echo "============================================================= OSS - Nexus Scan ============================================================"
                  echo "==========================================================================================================================================="
                  '''
                  String result = nexusscan("customerPortalWeb", "$WORKSPACE", "$nexus");
                  echo result;
                }
            }
          }
        }
        stage('Build') {
            agent {
              node {
                label 'node'
              }
            }
            steps {
                    withCredentials([file(credentialsId: 'e9653c44-a71d-4beb-8e12-bb7892e7e774', variable: 'SECRET')]) {
                    sh '''
                    node --version
                    apk add --update --no-cache make g++ python3 curl
                    mkdir app
                    yarn install --network-timeout 1000000000
                    '''
                    script{
                      if(env.BRANCH_NAME == 'release'){
                        BASE_URL_ENV='\'https\\:\\/\\/www.life.id\\/api\''
                        GOOGLE_ANALYTICS_TAG='\'G-XP39LDCWMZ\''
                        GOOGLE_TAG_MANAGER='\'https\\:\\/\\/www.googletagmanager.com\\/gtag\\/js?id=G-XP39LDCWMZ\''
                        GOOGLE_NEW_TAG_MANAGER='\'https\\:\\/\\/www.googletagmanager.com\\/ns.html\\?id=GTM-NT56X8M\''
                        GOOGLE_ANALYTICS_REPLACEMENT='\'https\\:\\/\\/www.googletagmanager.com\\/gtag\\/js?id=G-XP39LDCWMZ\''
                      }else if(env.BRANCH_NAME == 'uat')  {
                        BASE_URL_ENV='\'https\\:\\/\\/uat.life.id\\/api\''
                        GOOGLE_ANALYTICS_TAG='\'G-F2G3VFYYMR\''
                        GOOGLE_TAG_MANAGER='\'https\\:\\/\\/www.googletagmanager.com\\/gtag\\/js?id=G-F2G3VFYYMR\''
                        GOOGLE_NEW_TAG_MANAGER='\'https\\:\\/\\/www.googletagmanager.com\\/ns.html\\?id=GTM-NT56X8M\''
                      }else{
                        BASE_URL_ENV='\'https\\:\\/\\/uat.life.id\\/api\''
                        GOOGLE_ANALYTICS_TAG='\'G-F2G3VFYYMR\''
                        GOOGLE_TAG_MANAGER='\'https\\:\\/\\/www.googletagmanager.com\\/gtag\\/js?id=G-F2G3VFYYMR\''
                        GOOGLE_NEW_TAG_MANAGER='\'https\\:\\/\\/www.googletagmanager.com\\/ns.html\\?id=GTM-NT56X8M\''
                      }
                    }
                    sh '''
                    echo 'SET GOOGLE_ANALYTICS'
                    sed -i "s/process.env.GOOGLE_ANALYTICS/'''+GOOGLE_ANALYTICS_TAG+'''/g" next.config.js
                    echo 'SET BASE_URL'
                    sed -i "s/process.env.BASEURL/'''+BASE_URL_ENV+'''/g" next.config.js
                    echo 'SET GOOGLE_TAG_MANAGER'
                    sed -i "s/process.env.GOOGLE_TAG_MANAGER/'''+GOOGLE_TAG_MANAGER+'''/g" next.config.js
                    echo 'SET GOOGLE_NEW_TAG_MANAGER'
                    sed -i "s/process.env.GOOGLE_NEW_TAG_MANAGER/'''+GOOGLE_NEW_TAG_MANAGER+'''/g" next.config.js
                
                    echo 'change to _documents'
                    sed -i "s/\'GOOGLE_TAG_MANAGER\'/'''+GOOGLE_TAG_MANAGER+'''/g" src/pages/_app.js
                    echo 'change to _documents 2'
                    sed -i "s/\'GOOGLE_NEW_TAG_MANAGER\'/'''+GOOGLE_NEW_TAG_MANAGER+'''/g" src/pages/_app.js
                    
                    cat next.config.js
                    cp ${SECRET} .

                    ls -la

                    PERSIST_KEY=$(cat ${SECRET} | grep 'PERSIST_KEY=' | awk '{split($0,a,"="); print a[2]}')
                    GOOGLE_DEVICE_ID=$(cat ${SECRET} | grep 'GOOGLE_DEVICE_ID=' | awk '{split($0,a,"="); print a[2]}')
                    LIVENESS_SECRET_KEY=$(cat ${SECRET} | grep 'LIVENESS_SECRET_KEY=' | awk '{split($0,a,"="); print a[2]}')
                    API_FIREBASE=$(cat ${SECRET} | grep 'API_FIREBASE=' | awk '{split($0,a,"="); print a[2]}')

                    rm -rf ${SECRET}

                    echo 'SET PERSIST_KEY'
                    sed -i "s/process.env.PERSISTKEY/'\${PERSIST_KEY}\'/g" next.config.js
                    echo 'SET GOOGLE_DEVICE_ID'
                    sed -i "s/process.env.GOOGLE_DEVICE_ID/'\${GOOGLE_DEVICE_ID}\'/g" next.config.js
                    echo 'SET LIVENESS_SECRET_KEY'
                    sed -i "s/process.env.LIVENESS_SECRET_KEY/'\${LIVENESS_SECRET_KEY}\'/g" next.config.js
                    echo 'SET API_FIREBASE'
                    sed -i "s/process.env.API_FIREBASE/'\${API_FIREBASE}\'/g" next.config.js

                    cat src/pages/_app.js

                    yarn build && yarn export
                    ls -lrth
                    pwd
                    cp -r out/ default.conf app/
                    ls -lrth app/
                    '''
                    stash includes: 'app/', name: 'app'
                    }
                }
            }
        }
      }
    stage('Build Docker Image') {
		 agent {
             label 'dind'
	        }
             steps {
			  withCredentials([usernamePassword(credentialsId: 'bede60e9-ac4c-48f5-9575-8f4debf148bf', usernameVariable: 'ARTIUSERNAME', passwordVariable: 'ARTIPASSWORD')]){
			  unstash 'app'
			    sh '''
                echo 'ls from docker image'
                ls -lrth
				echo ${ARTIPASSWORD} | docker login -u ${ARTIUSERNAME} --password-stdin docker-customer.artifact.ifg-life.id
        docker build -f Dockerfile --build-arg arch=-amd64 -t docker-customer.artifact.ifg-life.id/customer/customer-portal-${BRANCH_NAME}:latest .
		    docker push docker-customer.artifact.ifg-life.id/customer/customer-portal-${BRANCH_NAME}:latest

        '''
        script{
        if (env.BRANCH_NAME == 'release') {
        sh '''
          docker tag docker-customer.artifact.ifg-life.id/customer/customer-portal-${BRANCH_NAME}:latest docker-customer.artifact.ifg-life.id/customer/customer-portal-${BRANCH_NAME}:${BUILD_NUMBER}
          docker push docker-customer.artifact.ifg-life.id/customer/customer-portal-${BRANCH_NAME}:${BUILD_NUMBER}
         '''
          }
        }

        sh '''
				docker logout docker-customer.artifact.ifg-life.id/customer/customer-portal-${BRANCH_NAME}:latest
        docker logout docker-customer.artifact.ifg-life.id/customer/customer-portal-${BRANCH_NAME}:${BUILD_NUMBER}
				'''
          }
          script {
                    if (env.BRANCH_NAME != 'development') {
                        aquasecscan("docker-customer.artifact.ifg-life.id/customer/customer-portal-${BRANCH_NAME}:latest")
                    }
                }
         }
        }
      stage('Deploy DEV') {
      when { beforeAgent true
           branch 'development'
          }
      	agent {
             label 'dind'
	        }
             steps {

	 		  withCredentials([file(credentialsId: '6b3ead8f-d9e5-4d71-8c35-3fd32d8bfbd8', variable: 'KUBECONFIG')]) {
	 		  git branch: 'development', credentialsId: '5cc7f16e-0896-4c1c-ab0c-c44fdcef6a8c', url: 'ssh://git@code.ifg-life.id:7999/ictr/kube-manifest.git'
	 		    sh '''
				 set +x
	 			 echo "----------------Preparing Kubectl Option---------------"
	 		     cat ${KUBECONFIG} > kubeconfig
				 export KC_OPTS=${KC_OPTS}" --kubeconfig=kubeconfig"
                 export KC_OPTS=${KC_OPTS}" --insecure-skip-tls-verify=true"
				 alias kc="kubectl ${KC_OPTS} $*"
				 ls -lrth
				 sed -i "s/{BRANCH_NAME}/$BRANCH_NAME/g" customer-portal.yaml
                 echo "----------------Deploying Manifest---------------"
				 if kc get pod | grep customer-portal; then
                       kc patch deploy/customer-portal -p '{"spec":{"template":{"metadata":{"labels":{"date":"'$(date +'%s')'"}}}}}'
                 else
                       kc apply -f customer-portal.yaml
                 fi

				 echo "----------------Deploying Manifest---------------"
				 kc get pod && kc get service
	 		    '''
            }
        }
      }
      stage('Deploy UAT') {
      when { beforeAgent true
           branch 'uat'
          }
      	agent {
             label 'dind'
	        }
             steps {

      	 		  withCredentials([file(credentialsId: '95c555c0-cd67-425f-8022-a3dde2d701ed', variable: 'KUBECONFIG')]) {
      	 		  git branch: 'uat', credentialsId: '5cc7f16e-0896-4c1c-ab0c-c44fdcef6a8c', url: 'ssh://git@code.ifg-life.id:7999/ictr/kube-manifest.git'
	 		    sh '''
      				 set +x
      	 			 echo "----------------Preparing Kubectl Option---------------"
	 		     cat ${KUBECONFIG} > kubeconfig
				 export KC_OPTS=${KC_OPTS}" --kubeconfig=kubeconfig"
                 export KC_OPTS=${KC_OPTS}" --insecure-skip-tls-verify=true"
				 alias kc="kubectl ${KC_OPTS} $*"
				 ls -lrth
					sed -i "s/{BRANCH_NAME}/$BRANCH_NAME/g" customer-portal.yaml
                 echo "----------------Deploying Manifest---------------"
      				 if kc get pod | grep customer-portal; then
                             kc patch deploy/customer-portal -p '{"spec":{"template":{"metadata":{"labels":{"date":"'$(date +'%s')'"}}}}}'
                       else
                             kc apply -f customer-portal.yaml
                       fi

				 echo "----------------Deploying Manifest---------------"
				 kc get pod && kc get service
	 		    '''
            }
        }
      }
    }
}
