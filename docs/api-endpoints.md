# Documentation API Django

## Base URL
`http://localhost:8000/api/`

## Endpoints

### MOTOS
- `GET /motos/` - Liste toutes les motos
- `GET /motos/{id}/` - Détails d'une moto
- `POST /motos/` - Créer une nouvelle moto
- `PUT /motos/{id}/` - Modifier une moto
- `DELETE /motos/{id}/` - Supprimer une moto
- `GET /motos/disponibles/` - Liste des motos non vendues
- `GET /motos/par_marque/?marque=HONDA` - Filtre par marque
- `POST /motos/{id}/vendre/` - Marquer une moto comme vendue

### VENDEURS
- `GET /vendeurs/` - Liste tous les vendeurs
- `POST /vendeurs/` - Créer un vendeur

### VENTES
- `GET /ventes/` - Historique des ventes