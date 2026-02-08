from django.contrib import admin
from .models import Moto, Vendeur, Vente

@admin.register(Moto)
class MotoAdmin(admin.ModelAdmin):
    list_display = ('marque', 'modele', 'annee', 'prix', 'type_moto', 'vendu', 'image_tag')
    list_filter = ('marque', 'type_moto', 'vendu')
    search_fields = ('marque', 'modele', 'couleur')
    readonly_fields = ('image_tag',)

@admin.register(Vendeur)
class VendeurAdmin(admin.ModelAdmin):
    list_display = ('nom', 'email', 'telephone', 'ville', 'date_inscription')
    search_fields = ('nom', 'email', 'ville')
    readonly_fields = ('date_inscription',)

@admin.register(Vente)
class VenteAdmin(admin.ModelAdmin):
    list_display = ('moto', 'vendeur', 'prix_vente', 'date_vente', 'acheteur_nom', 'acheteur_email')
    search_fields = ('moto__modele', 'vendeur__nom', 'acheteur_nom')
    readonly_fields = ('date_vente',)
