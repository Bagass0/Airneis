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

$query = "SELECT * FROM livraison WHERE id_compte = :accountId";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":accountId", $accountId);
$stmt->execute();
$accountLivraisons = $stmt->fetchAll(PDO::FETCH_ASSOC); // Utilisation de fetchAll au lieu de fetch

$response = array('status' => 'success', 'accountLivraisons' => $accountLivraisons); // Changement de "accountLivraison" à "accountLivraisons"
echo json_encode($response);

?>
