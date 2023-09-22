<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));

$id = $data->userId;

// Connexion à la base de données
try {
    $db = new PDO('mysql:host=localhost;dbname=airneis;charset=utf8', 'airneis', 'Admin1234!');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

$query = "SELECT adresse_livraison FROM espace_membres WHERE id = :ID";
$stmt = $db->prepare($query);
$stmt->bindParam(':ID', $id, PDO::PARAM_INT);
$stmt->execute();

// Vérifier si l'utilisateur existe et récupérer l'adresse de livraison
if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $adresseLivraison = $row['adresse_livraison'];

    // Répondre avec l'adresse de livraison
    $response = array('status' => 'success', 'adresse' => $adresseLivraison);
    echo json_encode($response);
} else {
    // Répondre avec un message d'erreur si l'utilisateur n'est pas trouvé
    $response = array('status' => 'error', 'message' => 'Utilisateur non trouvé.');
    echo json_encode($response);
}

?>


