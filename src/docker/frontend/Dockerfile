
# Étape 1 : Build Angular

FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json depuis le projet Angular
COPY src/frontend/frontend-app/package*.json ./

# Installer toutes les dépendances (dev incluses)
RUN npm ci

# Copier tout le code Angular
COPY src/frontend/frontend-app/ .

# Build Angular en production
RUN npm run build -- --configuration=production

# Étape 2 : Nginx

FROM nginx:1.25-alpine

# Supprimer la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier la config Nginx
COPY src/docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copier le build Angular
COPY --from=builder /app/dist/frontend-app/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
