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
    
    // Vérifier si l'ID correspond à un chiffre dans la colonne "categorie" de la table "produit"
    $stmt = $pdo->prepare('SELECT * FROM produits WHERE categorie = ?');
    $stmt->execute([$id]);
    
    if($stmt->rowCount() > 0) {
        // Retourner un message d'erreur si l'ID correspond à un chiffre dans la table "produit"
        echo json_encode(['error' => 'La catégorie comporte un ou des produits, elle ne peut pas être supprimée']);
    } else {
        // Retourner un message de succès si l'ID ne correspond à aucun chiffre dans la table "produit"
        echo json_encode(['success' => 'L\'ID ne correspond à aucun chiffre dans la table "produit"']);
    }
} else {
    // Retourner un message d'erreur en JSON si l'ID n'est pas spécifié
    echo json_encode(['error' => 'L\'ID n\'est pas spécifié']);
}
?>
