<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si des données de formulaire sont envoyées via POST

    // Récupérer le nom de la catégorie depuis les données du formulaire
	$id_categorie = $_POST['id'];

    // Vérifier si un fichier est téléchargé pour l'icone
    if (isset($_FILES['icon'])) {
        $icon = $_FILES['icon'];

        // Vérifier s'il y a eu une erreur lors de l'upload de l'icone
        if ($icon['error'] === 0) {
            $iconName = $id_categorie . 'icon.jpg'; // Nom de l'icone renommé
            $iconTmpName = $icon['tmp_name'];

            // Récupérer le chemin du répertoire courant
            $currentDir = getcwd();

            // Chemin du dossier parent des images
            $destinationFolder = $currentDir . '/../img_categorie/';

            // Chemin de destination complet pour l'icône
            $iconDestinationPath = $destinationFolder . $iconName;

            // Déplacer le fichier icône vers le dossier de destination
            move_uploaded_file($iconTmpName, $iconDestinationPath);

            // Retourner une réponse avec le nom du fichier enregistré
            echo json_encode(['status' => 'success', 'message' => 'Changement de l\'icon réussi', 'filename' => $iconName]);
        }
    }

} else {
    // Retourner un message d'erreur en JSON si la catégorie n'est pas spécifiée ou si la méthode de requête n'est pas POST
    echo json_encode(['status' => 'error', 'message' => 'La catégorie n\'est pas spécifiée ou la méthode de requête n\'est pas autorisée']);
}
?>
