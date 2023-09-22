<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

if(!isset($_GET['accountId'])) {
    echo json_encode(['error' => 'accountId n\'existe pas']);
    exit();
} else {
    $accountId = $_GET['accountId'];

    try {
        $pdo = new PDO("mysql:host=localhost;dbname=airneis", "airneis", "Admin1234!");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
        echo json_encode($response);
        exit();
    }

    $query = "SELECT * FROM commande WHERE id_compte = :accountId";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":accountId", $accountId, PDO::PARAM_INT);
    $stmt->execute();
    $commandes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Récupérer les produits associés à chaque commande
    foreach ($commandes as &$commande) {
        $queryProduits = "SELECT * FROM commande_produit WHERE id_commande = :commandeId";
        $stmtProduits = $pdo->prepare($queryProduits);
        $stmtProduits->bindParam(":commandeId", $commande['id'], PDO::PARAM_INT);
        $stmtProduits->execute();
        $produits = $stmtProduits->fetchAll(PDO::FETCH_ASSOC);
        $commande['produits'] = $produits;
    }

    echo json_encode($commandes);
}
?>
