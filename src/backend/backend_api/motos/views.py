from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Moto, Vendeur, Vente
from .serializers import MotoSerializer, MotoListSerializer, VendeurSerializer, VenteSerializer

class MotoViewSet(viewsets.ModelViewSet):
    queryset = Moto.objects.all().order_by('-date_ajout')

    def get_serializer_class(self):
        if self.action == 'list':
            return MotoListSerializer
        return MotoSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    
    
    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        motos = Moto.objects.filter(vendu=False)
        serializer = MotoListSerializer(motos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def par_marque(self, request):
        marque = request.query_params.get('marque', None)
        if marque:
            motos = Moto.objects.filter(marque=marque)
        else:
            motos = Moto.objects.all()
        
        serializer = MotoListSerializer(motos, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def vendre(self, request, pk=None):
        moto = self.get_object()
        moto.vendu = True
        moto.save()
        
        # Créer un enregistrement de vente
        vendeur_id = request.data.get('vendeur_id')
        prix_vente = request.data.get('prix_vente', moto.prix)
        acheteur_nom = request.data.get('acheteur_nom')
        acheteur_email = request.data.get('acheteur_email')
        
        if vendeur_id and acheteur_nom:
            vente = Vente.objects.create(
                moto=moto,
                vendeur_id=vendeur_id,
                prix_vente=prix_vente,
                acheteur_nom=acheteur_nom,
                acheteur_email=acheteur_email
            )
            return Response({'message': 'Moto vendue avec succès', 'vente_id': vente.id})
        
        return Response({'message': 'Moto marquée comme vendue'})

class VendeurViewSet(viewsets.ModelViewSet):
    queryset = Vendeur.objects.all().order_by('-date_inscription')
    serializer_class = VendeurSerializer

class VenteViewSet(viewsets.ModelViewSet):
    queryset = Vente.objects.all().order_by('-date_vente')
    serializer_class = VenteSerializer