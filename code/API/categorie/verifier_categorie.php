<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si le nom de catégorie est spécifié dans les paramètres de la requête GET
    if (isset($_GET['nom'])) {
        $nom_categorie = $_GET['nom'];

        // Vérifier si le nom de catégorie existe déjà dans la base de données
        $sql = "SELECT COUNT(*) as count FROM categorie WHERE nom = ?";
        $resultat = $pdo->prepare($sql);
        $resultat->execute([$nom_categorie]);
        $row = $resultat->fetch(PDO::FETCH_ASSOC);

        if ($row['count'] > 0) {
            // Le nom de catégorie existe déjà, retourner une réponse avec l'erreur
            echo json_encode(['error' => 'Le nom de la catégorie existe déjà']);
        } else {
            // Le nom de catégorie n'existe pas, retourner une réponse sans erreur
            echo json_encode([]);
        }
    } else {
        // Le nom de catégorie n'est pas spécifié, retourner une réponse avec l'erreur
        echo json_encode(['error' => 'Le nom de la catégorie n\'est pas spécifié']);
    }
} else {
    // Retourner un message d'erreur en JSON si la méthode de requête n'est pas GET
    echo json_encode(['error' => 'La méthode de requête n\'est pas autorisée']);
}
?>
