<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');

if (isset($_GET['email'])) {
    $email = $_GET['email'];

    $sql = "SELECT id FROM espace_membres WHERE email = ?";
    $resultat = $pdo->prepare($sql);
    $resultat->execute([$email]);

    $accountId = $resultat->fetch(PDO::FETCH_ASSOC);

    if ($accountId) {
        $updateSql = "UPDATE espace_membres SET reset = true, reset_time = NOW() WHERE id = ?";
        $updateResult = $pdo->prepare($updateSql);
        $updateResult->execute([$accountId['id']]);
    }

    echo json_encode($accountId);
} else {
    echo json_encode(['error' => 'L\'EMAIL n\'est pas spécifié']);
}
?>
