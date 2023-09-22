<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$id = $_GET['id'];

try {
    $pdo = new PDO("mysql:host=localhost;dbname=airneis", "airneis", "Admin1234!");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

$query = "DELETE FROM livraison WHERE id = :id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":id", $id);

try {
    $stmt->execute();
    $response = array("status" => "success", "message" => "Adresse de livraison supprimée avec succès");
    echo json_encode($response);
} catch (PDOException $e) {
    $response = array("status" => "error", "message" => "Erreur lors de la suppression de l'adresse de livraison");
    echo json_encode($response);
}

?>
