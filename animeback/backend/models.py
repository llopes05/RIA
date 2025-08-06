from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    """Modelo de usuário customizado para o sistema de login"""
    email = models.EmailField(unique=True)
    
    def __str__(self):
        return self.username

TIPOS_STATUS = [
    ("assistindo", "Assistindo"),
    ("assistido", "Assistido"),
    ("pendente", "Pendente"),
]

class Anime(models.Model):
    nome = models.CharField(max_length=100)
    episodios = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=TIPOS_STATUS, default="pendente")
    episodioAtual = models.IntegerField(default=0)
    nota = models.IntegerField(default=0)
    def __str__(self):
        return self.nome
    