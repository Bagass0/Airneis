**Application Mobile React Native**  
Le dossier "ReactNative" contient le code source de l'application mobile développée en React Native. Cette application mobile est destinée à offrir une expérience utilisateur conviviale pour les utilisateurs d'Airneis, leur permettant de parcourir les produits et de passer des commandes depuis leur appareil mobile.

**Fonctionnalités**  
L'application mobile React Native offre les fonctionnalités suivantes :  

• Parcourir les produits : Permet aux utilisateurs de parcourir les différentes catégories de meubles disponibles sur Airneis.

• Détails du produit : Affiche des informations détaillées sur un produit spécifique, y compris son nom, sa description, son prix, etc.

• Ajouter au panier : Permet aux utilisateurs d'ajouter des produits au panier d'achat pour une commande ultérieure.

• Passer une commande : Permet aux utilisateurs de passer une commande en fournissant les informations de livraison et de paiement.

• Suivre l'état de la commande : Affiche l'état de la commande en cours, le suivi de livraison, etc.

**Structure du Code**  
Le code de l'application mobile React Native est organisé de la manière suivante :  

• src/: Ce répertoire contient le code source principal de l'application mobile. Voici une brève description de certains fichiers et répertoires importants à l'intérieur de "src/":

• composants/: Ce répertoire contient les composants réutilisables de l'application, tels que les en-têtes, les pieds de page, etc.

• composants/contexte/: Ce répertoir contient les fichiers de contexte, ils permettent de partager des données entre différents composants du site web, ils sont utilisés pour créer un "store" de données qui peut être accessible de manière globale à tous les composants.

• screens/: Ce répertoire contient les écrans principaux de l'application, tels que l'écran d'accueil, l'écran des détails du produit, l'écran du panier d'achat, etc.

• services/: Ce répertoire contient les fichiers pour interagir avec l'API du site principal, afin de récupérer les produits, passer des commandes, etc.

• App.js: Ce fichier est le point d'entrée de l'application mobile React Native et définit la navigation entre les différents écrans.

• index.js: Ce fichier est le point d'entrée de l'application React Native et initialise le code dans le fichier principal.

**Installation et Exécution**  
Assurez-vous d'avoir React Native installé sur votre machine. Pour exécuter l'application mobile localement, suivez les étapes ci-dessous :  

• Clonez ce dépôt sur votre machine.

• Naviguez vers le répertoire "ReactNative" à l'aide de la ligne de commande "cd ReactNative".

• Exécutez npm install pour installer les dépendances du projet.

• Utilisez npm run android pour lancer l'application sur un émulateur Android.
