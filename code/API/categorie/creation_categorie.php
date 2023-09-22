<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si des données de formulaire sont envoyées via POST

    // Récupérer le nom de la catégorie depuis les données du formulaire
    $nom_categorie = $_POST['nom'];

    // Insérer le nom de la catégorie dans la base de données
    $sql = "INSERT INTO categorie (nom) VALUES (?)";
    $resultat = $pdo->prepare($sql);
    $resultat->execute([$nom_categorie]);

    // Récupérer l'ID généré pour la catégorie
    $id_categorie = $pdo->lastInsertId();

    // Vérifier si un fichier est téléchargé pour l'icône
    if (isset($_FILES['icon'])) {
        $icon = $_FILES['icon'];

        // Vérifier s'il y a eu une erreur lors de l'upload de l'icône
        if ($icon['error'] === 0) {
            $iconName = $id_categorie . 'icon.jpg'; // Nom de l'icône renommée
            $iconTmpName = $icon['tmp_name'];

            // Récupérer le chemin du répertoire courant
            $currentDir = getcwd();

            // Chemin du dossier parent des images
            $destinationFolder = $currentDir . '/../img_categorie/';

            // Chemin de destination complet pour l'icône
            $iconDestinationPath = $destinationFolder . $iconName;

            // Déplacer le fichier icône vers le dossier de destination
            move_uploaded_file($iconTmpName, $iconDestinationPath);

            if (isset($_FILES['banniere'])) {
                $banniere = $_FILES['banniere'];

                // Vérifier s'il y a eu une erreur lors de l'upload de la bannière
                if ($banniere['error'] === 0) {
                    $banniereName = $id_categorie . 'banniere.jpg';
                    $banniereTmpName = $banniere['tmp_name'];

                    // Récupérer le chemin du répertoire courant
                    $currentDir = getcwd();

                    // Chemin du dossier parent des images
                    $destinationFolder = $currentDir . '/../img_categorie/';

                    // Chemin de destination complet pour la bannière
                    $banniereDestinationPath = $destinationFolder . $banniereName;

                    // Déplacer le fichier bannière vers le dossier de destination
                    move_uploaded_file($banniereTmpName, $banniereDestinationPath);

                    // Retourner une réponse avec le nom du fichier de l'icône enregistré
                    echo json_encode(['status' => 'success', 'message' => 'Catégorie créée avec succès', 'icon' => $iconName, 'banniere' => $banniereName]);
                } else {
                    // Retourner une réponse d'erreur si une erreur s'est produite lors du téléchargement de la bannière
                    echo json_encode(['status' => 'error', 'message' => 'Une erreur s\'est produite lors du téléchargement de la bannière']);
                }
            } else {
                // Retourner une réponse d'erreur si aucune bannière n'a été téléchargée
                echo json_encode(['status' => 'error', 'message' => 'Aucune bannière n\'a été téléchargée']);
            }
        } else {
            // Retourner une réponse d'erreur si une erreur s'est produite lors du téléchargement de l'icône
            echo json_encode(['status' => 'error', 'message' => 'Une erreur s\'est produite lors du téléchargement de l\'icône']);
        }
    } else {
        // Retourner une réponse d'erreur si aucune icône n'a été téléchargée
        echo json_encode(['status' => 'error', 'message' => 'Aucune icône n\'a été téléchargée']);
    }
} else {
    // Retourner un message d'erreur en JSON si la catégorie n'est pas spécifiée ou si la méthode de requête n'est pas POST
    echo json_encode(['status' => 'error', 'message' => 'La catégorie n\'est pas spécifiée ou la méthode de requête n\'est pas autorisée']);
}
?>
