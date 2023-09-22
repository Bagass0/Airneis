<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si des données de formulaire sont envoyées via POST

    // Récupérer le nom de l'image envoyée
    $image = isset($_FILES['image']) ? $_FILES['image']['name'] : '';

    // Insérer le nom de l'image dans la base de données
    $sql = "INSERT INTO carousel (image) VALUES (?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$image]);

    // Récupérer l'ID généré pour l'entrée
    $id = $pdo->lastInsertId();

    // Vérifier si un fichier est téléchargé pour l'image
    if (isset($_FILES['image'])) {
        $imageFile = $_FILES['image'];

        // Vérifier s'il y a eu une erreur lors du téléchargement de l'image
        if ($imageFile['error'] === 0) {
            $imageName = $id . '.jpg';
            $imageTmpName = $imageFile['tmp_name'];

            // Récupérer le chemin du répertoire courant
            $currentDir = getcwd();

            // Chemin du dossier parent des images
            $destinationFolder = $currentDir . '/../img/carousel/';

            // Chemin de destination complet pour l'image
            $imageDestinationPath = $destinationFolder . $imageName;

            // Déplacer le fichier image vers le dossier de destination
            move_uploaded_file($imageTmpName, $imageDestinationPath);

            // Retourner une réponse avec le nom du fichier enregistré
            echo json_encode(['status' => 'success', 'message' => 'Image ajoutée avec succès', 'filename' => $imageName]);
        }
    }	
} else {
    // Retourner un message d'erreur en JSON si la méthode de requête n'est pas POST
    echo json_encode(['status' => 'error', 'message' => 'La méthode de requête n\'est pas autorisée']);
}
?>
