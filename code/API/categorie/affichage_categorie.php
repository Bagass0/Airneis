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
	$sql = "SELECT * FROM categorie WHERE id_categorie = ?";
	$resultat = $pdo->prepare($sql);
	$resultat->execute([$categorie]);

	// Vérifier si des données ont été renvoyées
	if ($resultat->rowCount() > 0) {
		// Récupération des données dans un tableau PHP
		$nom_categorie = $resultat->fetchAll(PDO::FETCH_ASSOC);

		// Retourner les données en JSON
		echo json_encode($nom_categorie);
	} else {
		// Retourner un message d'erreur en JSON si aucune catégorie n'est trouvée
		echo json_encode(['error' => 'Aucune catégorie trouvée avec cet ID']);
	}
} else {
    // Retourner un message d'erreur en JSON si la catégorie n'est pas spécifiée
    echo json_encode(['error' => 'La catégorie n\'est pas spécifiée']);
}
?>
