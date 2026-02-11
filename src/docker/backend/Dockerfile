
# Étape 1 : Builder
FROM python:3.11-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Dépendances système nécessaires pour psycopg2
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Création d’un environnement virtuel
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

COPY src/backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt


# Étape 2 : Runtime
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    libpq5 \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Copier l’environnement virtuel
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

# Copier le code
COPY src/backend/ .

# Créer les dossiers pour les fichiers statiques et média
RUN mkdir -p /app/staticfiles /app/media

#  Créer utilisateur
RUN useradd -m appuser

#  Donner les permissions au bon utilisateur
RUN chown -R appuser:appuser /app

# Passer en non-root
USER appuser

ENV DJANGO_SETTINGS_MODULE=backend_api.settings

EXPOSE 8000

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
