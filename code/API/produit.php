<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');

// Vérifier si l'ID est présent dans l'URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Requête SQL pour récupérer les données
    $sql = "SELECT * FROM produits WHERE id = ?";
    $resultat = $pdo->prepare($sql);
    $resultat->execute([$id]);

    // Récupération des données dans un tableau PHP
    $donnees = $resultat->fetch(PDO::FETCH_ASSOC);

    // Retourner les données en JSON
    echo json_encode($donnees);
} else {
    // Retourner un message d'erreur en JSON si l'ID n'est pas spécifié
    echo json_encode(['error' => 'L\'ID n\'est pas spécifié']);
}
?>
