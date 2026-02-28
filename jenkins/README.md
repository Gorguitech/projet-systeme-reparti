CI/CD avec Jenkins
 Description

Ce dossier contient la configuration complète de l’intégration continue et du déploiement continu (CI/CD) pour le projet Système Réparti.

Le pipeline est géré par Jenkins et permet :

Linting et tests du backend et du frontend

Build des images Docker

Push vers Docker Hub

Déploiement automatique sur Kubernetes (Minikube)

 Prérequis

Avant de lancer Jenkins, assurez-vous d’avoir :

Docker installé

Docker Compose installé

Minikube démarré

kubectl configuré

Vérification :

docker --version
minikube status
kubectl get nodes
 Lancer Jenkins

Depuis le dossier jenkins/ :

docker compose up -d

Accéder ensuite à :

http://localhost:8080

Récupérer le mot de passe initial :

docker exec jenkins-local cat /var/jenkins_home/secrets/initialAdminPassword
📂 Pipeline Jenkins

Le pipeline est défini dans le fichier :

Jenkinsfile
Étapes du pipeline :

Linting et tests

Build des images Docker

Push vers Docker Hub

Déploiement sur Kubernetes

Déploiement Kubernetes

Le déploiement est effectué sur un cluster local Minikube.

Les commandes exécutées par Jenkins incluent :

kubectl apply -f kubernetes/
kubectl rollout restart deployment/backend -n motos-app
kubectl rollout restart deployment/frontend -n motos-app
 Vérification du déploiement
kubectl get pods -n motos-app

Tous les pods doivent être en statut :

Running