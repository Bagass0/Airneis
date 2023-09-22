<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Connexion à la base de données avec PDO
try {
    $connexion = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');
} catch (PDOException $e) {
    die("Connexion échouée : " . $e->getMessage());
}
// Requête SQL pour récupérer les données
$sql = "SELECT * FROM carousel";
$resultat = $connexion->query($sql);

// Récupération des données dans un tableau PHP
$categories = $resultat->fetchAll(PDO::FETCH_ASSOC);

// Encodage en JSON et envoi au navigateur
echo json_encode($categories);
?>