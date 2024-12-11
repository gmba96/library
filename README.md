# Documentation Technique

### Prérequis
Node.js (version 14 ou supérieure)
PostgreSQL

## Architecture
Le projet est divisé en deux parties principales :

1) library-service : Un service backend construit avec Node.js et Express.js pour gérer les opérations CRUD sur les livres.
2) library-web : Une application frontend construite avec Angular pour interagir avec le service backend et fournir une interface utilisateur.
   
## Technologies Utilisées
Backend (library-service) :
Node.js 
Express.js
PostgreSQL (via le module pg)

Frontend (library-web) :
Angular
TypeScript
HTML/CSS
Chart.js (pour les visualisations)


## Serveur de développement

Pour démarrer un serveur de développement local, exécutez :

```bash
ng serve
```

Une fois le serveur démarré, ouvrez votre navigateur et accédez à http://localhost:4200/. L'application se rechargera automatiquement chaque fois que vous modifiez l'un des fichiers source.

## Structure du projet

library-service/
  ├── config/
  │   └── db.js
  ├── controller/
  │   └── bookController.js
  ├── dao/
  │   └── bookDao.js
  ├── routes/
  │   └── bookRoutes.js
  ├── service/
  │   └── bookService.js
  ├── server.js
  └── package.json

library-web/
  ├── src/
  │   ├── app/
  │   │   ├── components/
  │   │   │   ├── search-page/
  │   │   │   │   ├── search-page.component
  │   │   │   ├── visualisation-page/
  │   │   │   │   ├── visualisation-page.component
  │   │   │   ├── add-page/
  │   │   │   │   ├── home-page.component
  │   │   │   ├── add-page/
  │   │   │   │   ├── add-page.component
  │   │   │   ├── choice-page/
  │   │   │   │   ├── choice-page.component
  │   │   │   │   ├── choices/
  │   │   │   │   │   ├── choices.component
  │   │   ├── interface/
  │   │   │   └── interface.service.ts
  │   │   ├── models/
  │   │   │   └── models.service.ts
  │   │   ├── services/
  │   │   │   └── book.service.ts
  │   │   ├── app.component
  │   ├── index.html
  │   ├── main.ts
  │   ├── styles.css
  ├── angular.json
  ├── package.json
  └── README.md



# Guide Utilisateur

### Accueil
Lorsque vous accédez à l'application, vous êtes accueilli par une page d'accueil avec des options pour rechercher, ajouter et visualiser des livres.

### Recherche de Livres
Accédez à la page de recherche en cliquant sur "Chercher un livre".
Remplissez les critères de recherche (ID, Titre, Auteur, Année, Note, Genre).
Cliquez sur le bouton "Search" pour afficher les résultats.

### Ajout de Livres
Accédez à la page d'ajout en cliquant sur "Ajouter un livre".
Remplissez les informations du livre (Titre, Auteur, Note, Année, Genre).
Cliquez sur le bouton "Add" pour ajouter le livre à la base de données.

### Visualisation des Livres
Accédez à la page de visualisation en cliquant sur "Visualisation".
Vous verrez des graphiques représentant les livres par année et par genre.

### Gestion des Livres
Dans la page de recherche, vous pouvez mettre à jour ou supprimer des livres en utilisant les boutons "Update" et "Delete" à côté de chaque livre dans la liste des résultats.

### Navigation
Utilisez les boutons de navigation pour revenir à la page d'accueil ou pour naviguer entre les différentes pages de l'application.

