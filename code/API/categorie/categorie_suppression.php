<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Vérifier si l'ID est présent dans l'URL
if(isset($_GET['id'])) {
    $id = $_GET['id'];
    
    // Connexion à la base de données
    $pdo = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');
    
    // Récupérer les informations de la catégorie avant de la supprimer
    $stmt = $pdo->prepare('SELECT * FROM categorie WHERE id_categorie = ?');
    $stmt->execute([$id]);
    $categorie = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($categorie) {
        // Supprimer la catégorie de la base de données
        $stmt = $pdo->prepare('DELETE FROM categorie WHERE id_categorie = ?');
        $stmt->execute([$id]);
        
        // Chemin vers le répertoire où se trouvent les images
        $imageDirectory = '../img_categorie/';
        
        // Chemin complet de l'image icon
        $imagePathIcon = $imageDirectory . $id . 'icon.jpg';
        
        // Vérifier si l'image icon existe et la supprimer
        if (file_exists($imagePathIcon)) {
            unlink($imagePathIcon);
        }
        
        // Chemin complet de l'image banniere
        $imagePathBanniere = $imageDirectory . $id . 'banniere.jpg';
        
        // Vérifier si l'image banniere existe et la supprimer
        if (file_exists($imagePathBanniere)) {
            unlink($imagePathBanniere);
        }
        
        // Vérifier si la catégorie et les images ont été supprimées
        if($stmt->rowCount() > 0) {
            // Retourner un message de succès
            http_response_code(204);
        }
    } else {
        // Retourner un message d'erreur si la catégorie n'existe pas
        echo json_encode(['error' => 'La catégorie n\'existe pas']);
    }
} else {
    // Retourner un message d'erreur en JSON si l'ID n'est pas spécifié
    echo json_encode(['error' => 'L\'ID n\'est pas spécifié']);
}
?>
