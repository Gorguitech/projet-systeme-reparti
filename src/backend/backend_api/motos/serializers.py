from rest_framework import serializers
from .models import Moto, Vendeur, Vente

class MotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moto
        fields = '__all__'
        read_only_fields = ('date_ajout',)

class MotoListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Moto
        fields = [
            'id',
            'marque',
            'modele',
            'annee',
            'kilometrage',
            'prix',
            'type_moto',
            'couleur',
            'description',
            'vendu',
            'image_url',
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        return None



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