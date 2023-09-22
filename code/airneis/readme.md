**Airneis - Code React du Site Web**

Ce dossier "airneis" contient tout le code source du site web Airneis, développé en React. Le site web est une plateforme e-commerce spécialisée dans la vente de meubles de haute qualité.


**Fonctionnalités**  

Le site web Airneis propose les fonctionnalités suivantes :

Parcourir les catégories de meubles et consulter les produits individuels.
Rechercher des meubles spécifiques par nom, catégorie, etc.
Ajouter des produits au panier d'achat et gérer les quantités.
Passer une commande en fournissant les informations de livraison et de paiement.
Suivre l'état de la commande et consulter l'historique des achats.


**Structure du Code**  
Le code du site web Airneis est organisé de la manière suivante :  

 •public/: Ce répertoire contient les fichiers statiques tels que le fichier HTML principal, les images, les icônes, etc.  

 • src/: Ce répertoire contient le code source principal du site web. Voici une brève description de certains fichiers et répertoires importants à l'intérieur de "src/":  

 • composants/: Ce répertoire contient les composants réutilisables du site, tels que les en-têtes, les pieds de page, les cartes de produits, etc.  

 • pages/: Ce répertoire contient les pages principales du site, telles que la page d'accueil, les pages de catégories, la page de détails du produit, etc.  

 • services/: Ce répertoire contient les fichiers pour interagir avec l'API du site ou d'autres services externes.  

 • App.js: Ce fichier est le point d'entrée de l'application et gère le routage entre les différentes pages.  

 • index.js: Ce fichier est le point d'entrée de l'application React et montre le contenu principal dans le fichier HTML.  

 • composants/contexte/: Ce répertoir contient les fichiers de contexte, ils permettent de partager des données entre différents composants du site web, 
ils sont utilisés pour créer un "store" de données qui peut être accessible de manière globale à tous les composants.  

 • composants/verif/: Ce répertoire contient les fichiers pour la vérification des champs de notre site web.  

 • composants/alert/: Ce répetoire contient des fichiers qui affiche un message, ces fichiers viennent compléter les fonctionnalités du répetoire verif  


**Installation et Exécution**  

 •Assurez-vous d'avoir Node.js et npm installés sur votre machine. Pour exécuter le site web localement, suivez les étapes ci-dessous :

 • Clonez ce dépôt sur votre machine.

 • Naviguez vers le répertoire "airneis" à l'aide de la ligne de commande "cd airneis".

 • Exécutez npm install pour installer les dépendances du projet.

 • Utilisez la commande npm run dev pour démarrer le serveur de développement.

Le site web sera accessible dans votre navigateur à l'adresse http://localhost:5173.
