# Étape 3 : Conteneurisation avec Docker

## Architecture Docker

L'application est conteneurisée en trois services :

### 1. PostgreSQL (Base de données)
- **Image**: `postgres:15-alpine`
- **Port**: 5432
- **Volume persistant**: `postgres_data`


### 2. Django Backend (API REST)
- **Image**: `python:3.11-slim` + multi-stage build
- **Port**: 8000
- **Serveur**: Gunicorn avec 3 workers
- **Healthcheck**: Vérification automatique de l'API

### 3. Angular Frontend (Interface utilisateur)
- **Image**: `nginx:1.25-alpine` + multi-stage build
- **Port**: 80
- **Serveur**: Nginx avec configuration optimisée
- **Proxy**: Redirection API vers backend

## Fichiers de configuration

### Dockerfiles
- `backend/Dockerfile` : Build optimisé en deux étapes
- `frontend/Dockerfile` : Build Angular + serveur Nginx


### docker-compose.yml
- Orchestration des 3 services
- Dépendances et healthchecks
- Volumes persistants
- Réseau isolé

## Commandes de test

```bash
# Build et lancement
./src/docker/build-and-run.sh

# Voir les logs
docker-compose -f src/docker/docker-compose.yml logs -f

# Arrêter les conteneurs
docker-compose -f src/docker/docker-compose.yml down

# Nettoyer
docker system prune -f