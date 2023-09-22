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

try {
    $pdo->beginTransaction();

    // Mettre à jour l'état de la commande
    $query = "UPDATE commande SET etat = 'Annulé' WHERE id = :commandeId";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":commandeId", $commandeId);
    $stmt->execute();

    // Récupérer les produits de la commande
    $query = "SELECT id_produit, quantite_produit FROM commande_produit WHERE id_commande = :commandeId";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":commandeId", $commandeId);
    $stmt->execute();
    $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Mettre à jour le stock des produits
    foreach ($produits as $produit) {
        $idProduit = $produit['id_produit'];
        $quantiteProduit = $produit['quantite_produit'];

        $query = "UPDATE produits SET stock = stock + :quantite WHERE id = :idProduit";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":quantite", $quantiteProduit);
        $stmt->bindParam(":idProduit", $idProduit);
        $stmt->execute(); // Ajout de cette ligne pour exécuter la requête de mise à jour
    }

    $pdo->commit();

    $response = array("status" => "success", "message" => "Commande annulée avec succès");
    echo json_encode($response);
} catch (PDOException $e) {
    $pdo->rollBack();

    $response = array("status" => "error", "message" => "Erreur lors de l'annulation de la commande : " . $e->getMessage());
    echo json_encode($response);
}
