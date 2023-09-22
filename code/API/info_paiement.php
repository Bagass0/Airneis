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

$query = "SELECT * FROM paiement WHERE id_compte = :accountId";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":accountId", $accountId);
$stmt->execute();
$accountPaiement = $stmt->fetchAll(PDO::FETCH_ASSOC);

$response = array('status' => 'success', 'accountPaiement' => $accountPaiement);
echo json_encode($response);

?>
