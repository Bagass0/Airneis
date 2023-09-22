<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');

// Vérifier si l'ID est présent dans l'URL
if(isset($_GET['id'])) {
    $id = $_GET['id'];
    // Requête SQL pour supprimer la ligne correspondant à l'ID
    $stmt = $pdo->prepare('DELETE FROM contact WHERE id = ?');
    $stmt->execute([$id]);
    // Vérifier si la ligne a été supprimée
    if($stmt->rowCount() > 0) {
        // Retourner un message de succès
        http_response_code(204);
    }
} else {
    // Retourner un message d'erreur en JSON si l'ID n'est pas présent
    echo json_encode(['error' => 'L\'ID n\'est pas spécifié']);
}
?>