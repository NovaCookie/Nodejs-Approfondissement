# API de Gestion d'Articles

Une API REST complète pour la gestion d'articles avec authentification, temps réel et déploiement.

## Fonctionnalités

- Gestion des articles (CRUD complet)
- Authentification JWT
- Rôles utilisateur (member/admin)
- Temps réel avec Socket.io
- Tests unitaires
- Déploiement PM2 avec cluster

## Prérequis

- Node.js
- MongoDB
- Postman
- PM2 (pour la production)

## Installation

# Cloner le projet

git clone git@github.com:NovaCookie/Nodejs-Approfondissement.git

# Installer les dépendances

npm install

# Démarrer en développement

npm run serve

## Utilisation

### Authentification

POST /api/users/login
Body :
{
"email": "admin@example.com",
"password": "password123"
}

### Créer un article (authentifié)

POST /api/articles
Headers : x-access-token: VOTRE_TOKEN
Body :
{
"title": "Mon article",
"content": "Contenu",
"status": "draft"
}

### Modifier un article (admin seulement)

PUT /api/articles/:id
Headers : x-access-token: le token
Body :
{
"title": "Titre modifié",
"status": "published"
}

### Supprimer un article (admin seulement)

DELETE /api/articles/:id
Headers : x-access-token: le token

### Articles d'un utilisateur (public)

GET /api/articles/user/:userId/articles

## Documentation

- Diagramme de base de données (database-diagram.md)
- Commandes PM2 (Cmd-PM2.md)
- Diagramme base de données (database-diagram.png)

## Tests

npm test

## Production

pm2 start ecosystem.config.js --env production

pm2 status / pm2 monit

## Structure du projet

api/
articles/ - Routes et contrôleurs articles
users/ - Gestion des utilisateurs
middlewares/
auth.js - Authentification JWT
admin.js - Vérification rôle admin
tests/ - Tests unitaires
logs/ - Logs de production
public/ - Interface web

## Endpoints

POST /api/users - Créer un compte (public)

POST /api/users/login - Connexion (public)

POST /api/articles - Créer article (user connecté)

PUT /api/articles/:id - Modifier article (admin seulement)

DELETE /api/articles/:id - Supprimer article (admin seulement)

GET /api/users/:userId/articles - Articles d'un utilisateur (public)

Développé avec Node.js, Express, MongoDB et Socket.io
