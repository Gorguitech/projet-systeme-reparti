#!/bin/bash

echo " Démarrage CI/CD..."

# Vérifier Docker
if ! docker info > /dev/null 2>&1; then
    echo " Docker n'est pas lancé"
    exit 1
fi

# Lancer Jenkins
docker compose down
docker compose up -d

echo "Attente démarrage Jenkins..."
sleep 25

PASS=$(docker exec jenkins-local cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null)

echo ""
echo "======================================"
echo "Jenkins prêt !"
echo "URL : http://localhost:8080"
echo "Mot de passe : $PASS"
echo "======================================"