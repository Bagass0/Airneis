<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$commandeId = $data->id;

try {
    $pdo = new PDO("mysql:host=localhost;dbname=airneis", "airneis", "Admin1234!");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

$query = "UPDATE commande SET etat = 'Expédiée' WHERE id = :commandeId";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":commandeId", $commandeId);

try {
    $stmt->execute();
    $response = array("status" => "success", "message" => "Commande Expédiée avec succès");
    echo json_encode($response);
} catch (PDOException $e) {
    $response = array("status" => "error", "message" => "Erreur lors de l'expédition de la commande : " . $e->getMessage());
    echo json_encode($response);
}

?>
