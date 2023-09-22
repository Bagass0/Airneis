<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$dsn = "mysql:host=localhost;dbname=airneis";
$utilisateur = "airneis";
$mot_de_passe = "Admin1234!";
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
try {
    $connexion = new PDO($dsn, $utilisateur, $mot_de_passe, $options);
} catch (PDOException $e) {
    die("Connexion échouée : " . $e->getMessage());
}

$sql = "SELECT * FROM produits";

if (!empty($_GET)) {
    $filters = [];
    if (!empty($_GET['min_price'])) {
        $filters[] = "prix >= " . intval($_GET['min_price']);
    }
    if (!empty($_GET['max_price'])) {
        $filters[] = "prix <= " . intval($_GET['max_price']);
    }
    if (!empty($_GET['materiaux'])) {
        $material_filters = array_map(function ($material) use ($connexion) {
            return "materiau = " . $connexion->quote($material);
        }, explode(',', $_GET['materiaux']));
        $filters[] = "(" . implode(' OR ', $material_filters) . ")";
    }
    if (!empty($_GET['stock_disponible']) && $_GET['stock_disponible'] == 1) {
        $filters[] = "stock > 0";
    }

    if (!empty($filters)) {
        $sql .= " WHERE " . implode(' AND ', $filters);
    }
}

$resultat = $connexion->query($sql);

$donnees = $resultat->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($donnees);
?>
