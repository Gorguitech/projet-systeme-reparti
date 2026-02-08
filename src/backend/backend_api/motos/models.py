from django.db import models
from django.utils.html import mark_safe

class Moto(models.Model):
    MARQUE_CHOICES = [
        ('YAMAHA', 'Yamaha'),
        ('HONDA', 'Honda'),
        ('SUZUKI', 'Suzuki'),
        ('KAWASAKI', 'Kawasaki'),
        ('DUCATI', 'Ducati'),
        ('BMW', 'BMW'),
        ('AUTRE', 'Autre'),
    ]

    TYPE_CHOICES = [
        ('SPORT', 'Sportive'),
        ('ROADSTER', 'Roadster'),
        ('CUSTOM', 'Custom'),
        ('ENDURO', 'Enduro'),
        ('SCOOTER', 'Scooter'),
        ('GT', 'Grand Tourisme'),
    ]

    marque = models.CharField(max_length=20, choices=MARQUE_CHOICES)
    modele = models.CharField(max_length=100)
    annee = models.IntegerField()
    kilometrage = models.IntegerField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    type_moto = models.CharField(max_length=20, choices=TYPE_CHOICES)
    couleur = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    date_ajout = models.DateTimeField(auto_now_add=True)
    vendu = models.BooleanField(default=False)
    image = models.ImageField(upload_to='motos_image/', blank=True, null=True)

    def __str__(self):
        return f"{self.marque} {self.modele} ({self.annee})"

    def image_tag(self):
        if self.image:
            return mark_safe(f'<img src="/media/{self.image}" width="100" />')
        return "Pas d'image"
    image_tag.short_description = 'Image'

class Vendeur(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=20)
    ville = models.CharField(max_length=100)
    date_inscription = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

class Vente(models.Model):
    moto = models.ForeignKey(Moto, on_delete=models.CASCADE)
    vendeur = models.ForeignKey(Vendeur, on_delete=models.CASCADE)
    date_vente = models.DateTimeField(auto_now_add=True)
    prix_vente = models.DecimalField(max_digits=10, decimal_places=2)
    acheteur_nom = models.CharField(max_length=100)
    acheteur_email = models.EmailField()

    def __str__(self):
        return f"Vente {self.moto} - {self.date_vente.strftime('%Y-%m-%d')}"
