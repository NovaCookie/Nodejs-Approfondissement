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
- PM2 (pour la production)

## Installation

Cloner le projet :
git clone git@github.com:NovaCookie/Nodejs-Approfondissement.git

Installer les dépendances :
npm install

Démarrer en développement :
npm run serve

## Utilisation

### Authentification

POST /login
Body :
{
"email": "user@test.com",
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

## Structure du projet

api/
articles/ - Routes et contrôleurs articles
users/ - Gestion des utilisateurs
middlewares/ - Authentification et autorisations
tests/ - Tests unitaires
logs/ - Logs de production

## Endpoints

POST /api/articles - Utilisateur connecté
PUT /api/articles/:id - Admin seulement
DELETE /api/articles/:id - Admin seulement
GET /api/articles/user/:userId/articles - Public

Développé avec Node.js, Express, MongoDB et Socket.io
