# Étape 5 : Automatisation avec Ansible

## Objectif
Automatiser l'installation complète du cluster Kubernetes et le déploiement de l'application.

## Structure Ansible

### Inventaire
- **master** : 192.168.64.8
- **workers** : 192.168.64.9, 192.168.64.10

### Roles
1. **common** : Configuration système de base
2. **docker** : Installation et configuration de Docker
3. **kubernetes** : Installation de kubeadm, kubelet, kubectl
4. **jenkins** : Installation de jenkins

### Playbooks
| Playbook | Description |
|----------|-------------|
| `00-prepare-servers.yml` | Préparation des serveurs |
| `01-install-docker.yml` | Installation de Docker |
| `02-install-kubernetes.yml` | Installation de Kubernetes |
| `03-install-jenkins.yml` | Initialisation de jenkins |
| `04-join-workers.yml` | Jointure des workers |
| `05-install-flannel.yml` | Installation du réseau |
| `06-deploy-motos-app.yml` | Déploiement de l'application |
| `99-deploy-all.yml` | Déploiement complet |

## Commandes exécutées

```bash
# Test de connectivité
ansible all -i inventory/production/hosts.yml -m ping

# Déploiement complet
cd ansible
chmod +x run.sh
./run.sh