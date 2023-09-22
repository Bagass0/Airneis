<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si des données de formulaire sont envoyées via POST

    // Récupérer le nom de la catégorie depuis les données du formulaire
	$id = $_POST['id'];

    // Vérifier si un fichier est téléchargé pour l'icone
    if (isset($_FILES['image2'])) {
        $img = $_FILES['image2'];

        // Vérifier s'il y a eu une erreur lors de l'upload de l'icone
        if ($img['error'] === 0) {
            $imgName = $id . '-2.jpg'; // Nom de l'icone renommé
            $imgTmpName = $img['tmp_name'];

            // Chemin de destination complet pour l'icône
            $imgDestinationPath = '../img_produit/' . $imgName;

            // Déplacer le fichier icône vers le dossier de destination
            move_uploaded_file($imgTmpName, $imgDestinationPath);

            // Retourner une réponse avec le nom du fichier enregistré
            echo json_encode(['status' => 'success', 'message' => 'Changement de l\'image réussi']);
        }
    }

} else {
    // Retourner un message d'erreur en JSON si la catégorie n'est pas spécifiée ou si la méthode de requête n'est pas POST
    echo json_encode(['status' => 'error', 'message' => 'La catégorie n\'est pas spécifiée ou la méthode de requête n\'est pas autorisée']);
}
?>
