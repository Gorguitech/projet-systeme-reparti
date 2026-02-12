
 Étape 3 : Conteneurisation avec Docker
 1. Objectif
L’objectif de cette étape est de :

Isoler les services

Garantir la portabilité de l’application

Simplifier le déploiement

Assurer la persistance des données

Standardiser l’environnement d’exécution

L’application est conteneurisée en trois services orchestrés via Docker Compose.

2. Architecture Générale
Navigateur
    ↓
Nginx (Frontend Angular)
    ↓
Django API (Gunicorn)
    ↓
PostgreSQL
Les services communiquent via un réseau privé Docker :

motos_network (bridge)
 3. Service PostgreSQL
Image
postgres:15-alpine
Rôle
Stockage des données

Gestion relationnelle

Persistance via volume Docker

Configuration
Port interne : 5432

Volume persistant : postgres_data

Healthcheck : pg_isready

Volume
volumes:
  postgres_data:
Cela permet de conserver les données même après arrêt des conteneurs.

4. Service Backend – Django REST API
 Build
Image de base : python:3.11-slim

Multi-stage build

Environnement virtuel isolé

Utilisateur non-root

 Démarrage automatique
Un script entrypoint.sh est exécuté au démarrage :

- Attente de PostgreSQL
- python manage.py migrate
- python manage.py collectstatic
- Création automatique du superuser
- Lancement Gunicorn
 Serveur
Gunicorn (3 workers)
Port : 8000
 Volumes
volumes:
  - static_volume:/app/staticfiles
  - media_volume:/app/media
Volume	Rôle
static_volume	Fichiers statiques Django
media_volume	Images uploadées
 5. Service Frontend – Angular + Nginx
Build
Image base : node:20-alpine

Build Angular en mode production

Nginx pour servir les fichiers statiques

 Rôle de Nginx
Sert l’application Angular (SPA)

Proxy /api/ vers le backend

Sert les fichiers /media/

Optimisation cache des assets

Compression GZIP

 Port
80
 6. Réseau Docker
networks:
  motos_network:
    driver: bridge
Tous les services communiquent via leur nom :

Backend → postgres

Frontend → backend

 7. Variables d’environnement
Les variables sont centralisées dans un fichier .env :

POSTGRES_DB=motos_db
POSTGRES_USER=motos_user
POSTGRES_PASSWORD=motos_password
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

DJANGO_SETTINGS_MODULE=backend_api.settings
DEBUG=1
SECRET_KEY=xxxx
 8. docker-compose.yml
Le fichier docker-compose.yml orchestre :

Les 3 services

Les volumes persistants

Le réseau interne

Les dépendances

Les healthchecks

 9. Commandes d’exécution
Build
docker compose build
Lancement
docker compose up
Mode détaché
docker compose up -d
Logs
docker compose logs -f
Arrêt
docker compose down
Reset complet
docker compose down -v
10. Problèmes rencontrés et solutions
Durant la mise en place :

Problème	Solution
Conflits dépendances Angular	Alignement des versions
Images non accessibles	Configuration Nginx + volume media
Healthcheck backend	Script entrypoint personnalisé
CSS Admin Django absent	Configuration STATIC_ROOT
Erreur réseau npm	Relance build + cache propre

 Conclusion
La conteneurisation permet :

Une architecture modulaire

Une meilleure isolation des services

Une portabilité totale

Une facilité de déploiement

Une architecture prête pour Kubernetes

