 4. Déploiement de l’Application sur Kubernetes
4.1 Objectif du déploiement

L’objectif de cette phase est d’orchestrer les différents services de l’application (Frontend Angular, Backend Django et base de données PostgreSQL) à l’aide de Kubernetes, en utilisant un cluster local fourni par Minikube.

Ce déploiement vise à :

Garantir l’isolation des services

Assurer la persistance des données

Permettre une montée en charge future

Respecter les bonnes pratiques DevOps modernes

4.2 Organisation des manifests Kubernetes

Les fichiers de configuration Kubernetes ont été regroupés dans un dossier kubernetes/ et structurés de manière ordonnée :

00-namespace.yaml
01-postgres-pvc.yaml
02-media-pvc.yaml
03-postgres-deployment.yaml
04-postgres-service.yaml
05-backend-deployment.yaml
06-backend-service.yaml
07-frontend-deployment.yaml
08-frontend-service.yaml


Cette organisation respecte une logique de déploiement progressive :

Création du namespace dédié

Définition des volumes persistants

Déploiement de la base de données

Déploiement du backend

Déploiement du frontend

Cette approche améliore la lisibilité, la maintenabilité et la reproductibilité du déploiement.

4.3 Mise en place du cluster Kubernetes

Le cluster local a été initialisé à l’aide de Minikube.

Démarrage du cluster
minikube start

Vérification de l’état du cluster
kubectl get nodes


Le nœud principal (control-plane) est apparu avec l’état Ready, confirmant le bon fonctionnement du cluster.

Une erreur de configuration du contexte (kubeconfig misconfigured) a été rencontrée.
Elle a été corrigée via :

minikube update-context


Cela a permis de réaligner kubectl avec le cluster actif.

4.4 Construction et chargement des images Docker

Les images Docker du backend et du frontend ont été construites localement.

Backend
docker build -f src/docker/backend/Dockerfile -t motos-backend:latest .
minikube image load motos-backend:latest

Frontend
docker build -f src/docker/frontend/Dockerfile -t motos-frontend:latest .
minikube image load motos-frontend:latest


Dans un contexte académique ou professionnel, il est recommandé d’éviter l’usage du tag latest et de privilégier un versionnement explicite (v1, v2, etc.) afin de garantir la traçabilité des déploiements.

4.5 Déploiement des ressources Kubernetes

L’ensemble des manifests a été appliqué en une seule commande :

kubectl apply -f kubernetes/


Les ressources suivantes ont été créées :

Namespace motos-app

PersistentVolumeClaim pour PostgreSQL

PersistentVolumeClaim pour les fichiers média

Deployment PostgreSQL

Service PostgreSQL (ClusterIP)

Deployment Backend

Service Backend (ClusterIP)

Deployment Frontend

Service Frontend (NodePort)

4.6 Gestion de la persistance des données
4.6.1 Base de données PostgreSQL

Un PersistentVolumeClaim (postgres-pvc) a été défini afin de garantir la persistance des données indépendamment du cycle de vie du pod.

Ainsi, en cas de redémarrage ou de recréation du pod PostgreSQL, les données restent intactes.

Vérification :

kubectl get pvc -n motos-app

4.6.2 Fichiers média (images uploadées)

Un second PersistentVolumeClaim (media-pvc) a été configuré afin de partager les fichiers média entre :

Le backend (upload des images)

Le frontend (service des images via Nginx)

Montages configurés :

Backend : /app/media

Frontend : /usr/share/nginx/html/media

Cette configuration assure la cohérence entre le stockage et l’affichage des images.

4.7 Exposition des services
PostgreSQL et Backend

Ces services sont exposés en interne via des Services de type ClusterIP, garantissant leur accessibilité uniquement au sein du cluster Kubernetes.

Frontend

Le frontend est exposé via un Service de type NodePort.

Accès à l’application :

minikube service frontend -n motos-app


Sous macOS avec le driver Docker, Minikube crée un tunnel réseau temporaire.
Le terminal doit rester ouvert afin de maintenir l’accès au service.

4.8 Vérification et supervision
Vérification des pods
kubectl get pods -n motos-app


Tous les pods ont atteint l’état Running, confirmant la réussite du déploiement.

Consultation des logs
kubectl logs <pod-name> -n motos-app


Cette commande permet l’analyse des erreurs potentielles au sein des conteneurs.

Accès interactif à un pod
kubectl exec -it <pod-name> -n motos-app -- sh


Cette opération est utile pour vérifier la présence des fichiers ou tester la connectivité interne.

4.9 Problème rencontré et résolution

Lors d’une mise à jour du backend, l’ancienne version de l’image Docker était toujours utilisée malgré une reconstruction locale.

Cause :

Utilisation du tag latest

Mise en cache de l’image par Kubernetes

Solution adoptée :

Versionnement explicite des images (ex : motos-backend:v2)

Modification du Deployment

Application du nouveau manifest

kubectl apply -f kubernetes/05-backend-deployment.yaml


Cette démarche illustre l’importance du versionnement dans un environnement orchestré.

4.10 Conclusion

Le déploiement Kubernetes a permis :

Une séparation claire des responsabilités entre services

Une persistance fiable des données

Une exposition contrôlée des composants

Une architecture évolutive et maintenable

