# Structure du Backend Django

## Fichiers principaux

### Models (motos/models.py)
- **Moto** : Informations sur les motos à vendre
- **Vendeur** : Informations sur les vendeurs
- **Vente** : Historique des transactions

### Serializers (motos/serializers.py)
- Conversion objets Python ↔ JSON
- Validation des données
- Relations entre modèles

### Views (motos/views.py)
- VueSet pour CRUD complet
- Actions personnalisées (disponibles, vendre, etc.)
- Filtrage et pagination

## Base de données
- Développement : SQLite
- Production : PostgreSQL