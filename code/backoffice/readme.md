**Backoffice Airneis**  
Le dossier "backoffice" contient le code source du site backoffice de Airneis. Ce backoffice est une interface d'administration qui permet aux administrateurs du site de gérer les articles, y compris leur modification, suppression et ajout.

**Fonctionnalités**  
Le site backoffice de Airneis offre les fonctionnalités suivantes :  

• Liste des articles : Affiche la liste de tous les articles actuellement disponibles sur le site.

• Modification d'article : Permet de modifier les détails d'un article existant, tels que le nom, la description, le prix, etc.

• Modification d'images : Permet de modifier les images du carrousel, les catégories des articles.

• Suppression d'article : Permet de supprimer un article du site.

• Ajout d'article : Permet d'ajouter de nouveaux articles au catalogue.

• Réception des messages : Permet de lire et supprimer les messages qui ont été envoyés dans le formulaire de contact.


**Structure du Code**  
Le code du site backoffice est organisé de la manière suivante :  

• public/: Ce répertoire contient les fichiers statiques tels que le fichier HTML principal, les images, les icônes, etc.

• src/: Ce répertoire contient le code source principal du site backoffice. Voici une brève description de certains fichiers et répertoires importants à l'intérieur de "src/":

• composants/: Ce répertoire contient les composants réutilisables du backoffice, tels que les formulaires, les boutons, etc.

• pages/: Ce répertoire contient les pages principales du backoffice, telles que la page de liste des articles, la page de modification d'article, etc.

• services/: Ce répertoire contient les fichiers pour interagir avec l'API du site principal, afin de récupérer, mettre à jour ou supprimer les articles.

• App.js: Ce fichier est le point d'entrée de l'application et gère le routage entre les différentes pages du backoffice.

• index.js: Ce fichier est le point d'entrée de l'application React du backoffice et montre le contenu principal dans le fichier HTML.

 • composants/contexte/: Ce répertoir contient les fichiers de contexte, ils permettent de partager des données entre différents composants du site web,
 ils sont utilisés pour créer un "store" de données qui peut être accessible de manière globale à tous les composants.

**Installation et Exécution**  
Assurez-vous d'avoir Node.js et npm installés sur votre machine. Pour exécuter le site backoffice localement, suivez les étapes ci-dessous :  

• Clonez ce dépôt sur votre machine.

• Naviguez vers le répertoire "backoffice" à l'aide de la ligne de commande "cd backoffice".

• Exécutez npm install pour installer les dépendances du projet.

• Utilisez la commande npm start pour démarrer le serveur de développement.

Le site backoffice sera accessible dans votre navigateur à l'adresse http://localhost:5173
