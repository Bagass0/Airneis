<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$accountId = $_GET['accountId'];

try {
    $pdo = new PDO("mysql:host=localhost;dbname=airneis", "airneis", "Admin1234!");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

$query = "SELECT nom_facturation, prenom_facturation, pays_facturation, adresse_facturation, code_postal_facturation, ville_facturation FROM espace_membres WHERE id = :accountId";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":accountId", $accountId);
$stmt->execute();
$accountLivraison = $stmt->fetch(PDO::FETCH_ASSOC);

$response = array('status' => 'success', 'accountLivraison' => $accountLivraison);
echo json_encode($response);

?>
