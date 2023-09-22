**Dossier "API"**

Ce dossier contient tous les fichiers nécessaires pour notre API, développée en PHP. L'API joue un rôle essentiel dans l'interaction avec la base de données pour certaines fonctionnalités de notre site web.


**Présentation de l'API**

L'API (Interface de Programmation Applicative) est une interface qui permet à différentes parties de notre application de communiquer entre elles. Dans ce cas, elle facilite l'échange d'informations avec la base de données pour assurer le bon fonctionnement de certaines fonctionnalités de notre site.

**Fonctionnalités clés**

L'API dans ce dossier prend en charge les fonctionnalités suivantes :
1.	Récupération des données des produits : L'API permet de récupérer les informations concernant les produits disponibles sur notre site, telles que les noms, les descriptions, les prix, etc.
2.	Gestion des commandes : L'API gère la création, la modification et la suppression des commandes passées par les utilisateurs de notre site.
3.	Authentification des utilisateurs : Pour les fonctionnalités qui nécessitent une identification, l'API gère le processus d'authentification des utilisateurs.


**Structure des fichiers**  

Le dossier "API" est organisé de la manière suivante  

•	inscription.php/connexion.php: Ce fichier contient les configurations de connexion à la base de données, il est utilisé pour gérer l'inscription ou la connexion à airneis.  

•	articles.php: Ce fichier gère les requêtes liées aux produits, y compris la récupération des détails des produits.  

•	commande.php/annuler-commande: Ce fichier gère les requêtes liées aux commandes, comme la création de nouvelles commandes et la gestion des commandes existantes.  

•	Autres fichiers : En fonction des besoins spécifiques de l'API, d'autres fichiers peuvent être ajoutés pour gérer différentes fonctionnalités.  


**Utilisation de l'API**

Pour utiliser l'API, il est essentiel de s'assurer que le serveur web est correctement configuré pour exécuter des fichiers PHP. De plus, assurez-vous d'avoir configuré correctement les informations de connexion à la base de données dans le fichier config.php.
Une fois que l'API est déployée sur le serveur, d'autres parties de notre site pourront faire des requêtes HTTP appropriées à l'API pour accéder aux données ou exécuter des actions spécifiques.
