<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');

// Vérifier si la catégorie est présente dans l'URL
if(isset($_GET['categorie'])) {
    $categorie = $_GET['categorie'];
    
	// Requête SQL pour récupérer les données
	$sql = "SELECT * FROM produits WHERE categorie = ?";
	$resultat = $pdo->prepare($sql);
	$resultat->execute([$categorie]);

	// Récupération des données dans un tableau PHP
	$produits = $resultat->fetchAll(PDO::FETCH_ASSOC);

	// Retourner les données en JSON
	echo json_encode($produits);
	
} else {
    // Retourner un message d'erreur en JSON si la catégorie n'est pas spécifiée
    echo json_encode(['error' => 'La catégorie n\'est pas spécifiée']);
}
?>
