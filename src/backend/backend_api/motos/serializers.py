from rest_framework import serializers
from .models import Moto, Vendeur, Vente

class MotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moto
        fields = '__all__'
        read_only_fields = ('date_ajout',)

class MotoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moto
        fields = ['id', 'marque', 'modele', 'annee', 'prix', 'type_moto', 'vendu', 'image_url']

class VendeurSerializer(serializers.ModelSerializer):
    motos_vendues = serializers.SerializerMethodField()
    
    class Meta:
        model = Vendeur
        fields = '__all__'
        read_only_fields = ('date_inscription',)
    
    def get_motos_vendues(self, obj):
        return obj.vente_set.count()

class VenteSerializer(serializers.ModelSerializer):
    moto_info = MotoListSerializer(source='moto', read_only=True)
    vendeur_info = VendeurSerializer(source='vendeur', read_only=True)
    
    class Meta:
        model = Vente
        fields = '__all__'
        read_only_fields = ('date_vente',)