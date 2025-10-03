# API de Gestion d'Articles

Une API REST complète pour la gestion d'articles avec authentification, temps réel et déploiement.

## Fonctionnalités

- **Gestion des articles** (CRUD complet)
- **Authentification JWT**
- **Rôles utilisateur** (member/admin)
- **Temps réel** avec Socket.io
- **Tests unitaires**
- **Déploiement PM2** avec cluster

## Prérequis

- Node.js
- MongoDB
- PM2 (pour la production)

## Installation

\`\`\`bash

# Cloner le projet

git clone git@github.com:NovaCookie/Nodejs-Approfondissement.git

# Installer les dépendances

npm install

# Démarrer en développement

npm run serve
\`\`\`

## Utilisation

### Authentification

\`\`\`http
POST /login
{
"email": "user@test.com",
"password": "password123"
}
\`\`\`

### Créer un article (authentifié)

\`\`\`http
POST /api/articles
Headers: x-access-token: VOTRE_TOKEN
{
"title": "Mon article",
"content": "Contenu",
"status": "draft"
}
\`\`\`

### Articles d'un utilisateur (public)

\`\`\`http
GET /api/articles/user/:userId/articles
\`\`\`

## Documentation

- **Diagramme de base de données** (database-diagram.md) - Schéma UML de la structure des données
- **Commandes PM2** (Cmd-PM2.md) - Guide des commandes importantes pour le déploiement
- Diagramme base de données (database-diagram.png)

## Tests

\`\`\`bash
npm test
\`\`\`

## Production

\`\`\`bash
pm2 start ecosystem.config.js --env production
\`\`\`

## Structure

\`\`\`
api/
├── articles/ # Routes et contrôleurs articles
├── users/ # Gestion des utilisateurs
middlewares/ # Authentification et autorisations
tests/ # Tests unitaires
logs/ # Logs de production
\`\`\`

## Endpoints

| Méthode | Endpoint                            | Accès                |
| ------- | ----------------------------------- | -------------------- |
| POST    | /api/articles                       | Utilisateur connecté |
| PUT     | /api/articles/:id                   | Admin seulement      |
| DELETE  | /api/articles/:id                   | Admin seulement      |
| GET     | /api/articles/user/:userId/articles | Public               |

Développé avec Node.js, Express, MongoDB et Socket.io
