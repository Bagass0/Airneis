<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Connexion à la base de données avec PDO
$dsn = "mysql:host=localhost;dbname=airneis";
$utilisateur = "airneis";
$mot_de_passe = "Admin1234!";
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
try {
    $connexion = new PDO($dsn, $utilisateur, $mot_de_passe, $options);
} catch (PDOException $e) {
    die("Connexion échouée : " . $e->getMessage());
}
// Requête SQL pour récupérer les données
$sql = "SELECT * FROM contact";
$resultat = $connexion->query($sql);

// Récupération des données dans un tableau PHP
$donnees = $resultat->fetchAll(PDO::FETCH_ASSOC);

// Encodage en JSON et envoi au navigateur
echo json_encode($donnees);
?>