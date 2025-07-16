from django.db import models

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
    