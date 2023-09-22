<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$accountId = $data->accountId;
$adresseFacturation = $data->adresseFacturation;
$codePostalFacturation = $data->codePostalFacturation;
$villeFacturation = $data->villeFacturation;
$paysFacturation = $data->paysFacturation;
$nomFacturation = $data->nomFacturation;
$prenomFacturation = $data->prenomFacturation;

try {
    $pdo = new PDO("mysql:host=localhost;dbname=airneis", "airneis", "Admin1234!");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

$query = "UPDATE espace_membres SET adresse_facturation = :adresseFacturation, code_postal_facturation = :codePostalFacturation, ville_facturation = :villeFacturation, pays_facturation = :paysFacturation, nom_facturation = :nomFacturation, prenom_facturation = :prenomFacturation WHERE id = :accountId";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":adresseFacturation", $adresseFacturation);
$stmt->bindParam(":codePostalFacturation", $codePostalFacturation);
$stmt->bindParam(":villeFacturation", $villeFacturation);
$stmt->bindParam(":paysFacturation", $paysFacturation);
$stmt->bindParam(":nomFacturation", $nomFacturation);
$stmt->bindParam(":prenomFacturation", $prenomFacturation);
$stmt->bindParam(":accountId", $accountId);

try {
    $stmt->execute();
    $response = array("status" => "success", "message" => "Informations de facturation mises à jour avec succès");
    echo json_encode($response);
} catch (PDOException $e) {
    $response = array("status" => "error", "message" => "Erreur lors de la mise à jour des informations de facturation");
    echo json_encode($response);
}
?>
