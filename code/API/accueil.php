<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$servername = "localhost";
$username = "airneis";
$password = "Admin1234!";
$dbname = "airneis";

// Crée une connexion à la base de données avec PDO
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // Configure PDO pour qu'il retourne des tableaux associatifs
  $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
  // Active les exceptions PDO pour les erreurs de requête
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
  die("Erreur de connexion à la base de données : " . $e->getMessage());
}

// Récupère les images depuis la table "images"
$sql = "SELECT id, nom, prix FROM produits WHERE featured = '1' LIMIT 3";
$stmt = $conn->prepare($sql);
$stmt->execute();
$images = $stmt->fetchAll();

// Vérifie si des images ont été trouvées
if (count($images) > 0) {
  // Convertit le tableau en JSON et l'affiche
  echo json_encode($images);
} else {
  echo json_encode("Aucune image trouvée.");
}

$conn = null;
?>
