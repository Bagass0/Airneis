<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$accountId = $data->accountId;
$nomAdresseLivraison = $data->nomAdresseLivraison;
$nomLivraison = $data->nomLivraison;
$prenomLivraison = $data->prenomLivraison;
$adresseLivraison = $data->adresseLivraison;
$adresseLivraison2 = $data->adresseLivraison2;
$codePostalLivraison = $data->codePostalLivraison;
$villeLivraison = $data->villeLivraison;
$paysLivraison = $data->paysLivraison;
$nomFacturation = $data->nomFacturation;
$prenomFacturation = $data->prenomFacturation;
$adresseFacturation = $data->adresseFacturation;
$codePostalFacturation = $data->codePostalFacturation;
$villeFacturation = $data->villeFacturation;
$paysFacturation = $data->paysFacturation;
$nomPaiement = $data->nomPaiement;
$numeroPaiement = $data->numeroPaiement;
$datePaiement = $data->datePaiement;
$cvvPaiement = $data->cvvPaiement;
$totalProduit = $data->totalProduit;
$totalPanier = $data->totalPanier;

try {
    $pdo = new PDO("mysql:host=localhost;dbname=airneis", "airneis", "Admin1234!");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

$query = "INSERT INTO commande (id_compte, nom_adresse_livraison, nom_livraison, prenom_livraison, adresse_livraison, adresse_livraison2, code_postal_livraison, ville_livraison, pays_livraison, nom_facturation, prenom_facturation, adresse_facturation, code_postal_facturation, ville_facturation, pays_facturation, nom_paiement, numero_paiement, date_paiement, cvv_paiement, total_produit, total_panier )
VALUES (:accountId, :nomAdresseLivraison, :nomLivraison, :prenomLivraison, :adresseLivraison, :adresseLivraison2, :codePostalLivraison, :villeLivraison, :paysLivraison, :nomFacturation, :prenomFacturation, :adresseFacturation, :codePostalFacturation, :villeFacturation, :paysFacturation, :nomPaiement, :numeroPaiement, :datePaiement, :cvvPaiement, :totalProduit, :totalPanier)";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":accountId", $accountId);
$stmt->bindParam(":nomAdresseLivraison", $nomAdresseLivraison);
$stmt->bindParam(":nomLivraison", $nomLivraison);
$stmt->bindParam(":prenomLivraison", $prenomLivraison);
$stmt->bindParam(":adresseLivraison", $adresseLivraison);
$stmt->bindParam(":adresseLivraison2", $adresseLivraison2);
$stmt->bindParam(":codePostalLivraison", $codePostalLivraison);
$stmt->bindParam(":villeLivraison", $villeLivraison);
$stmt->bindParam(":paysLivraison", $paysLivraison);
$stmt->bindParam(":nomFacturation", $nomFacturation);
$stmt->bindParam(":prenomFacturation", $prenomFacturation);
$stmt->bindParam(":adresseFacturation", $adresseFacturation);
$stmt->bindParam(":codePostalFacturation", $codePostalFacturation);
$stmt->bindParam(":villeFacturation", $villeFacturation);
$stmt->bindParam(":paysFacturation", $paysFacturation);
$stmt->bindParam(":nomPaiement", $nomPaiement);
$stmt->bindParam(":numeroPaiement", $numeroPaiement);
$stmt->bindParam(":datePaiement", $datePaiement);
$stmt->bindParam(":cvvPaiement", $cvvPaiement);
$stmt->bindParam(":totalPanier", $totalPanier);
$stmt->bindParam(":totalProduit", $totalProduit);

try {
    $stmt->execute();
    $commandeId = $pdo->lastInsertId();

    $produitsCommande = $data->produitsCommande;
    foreach ($produitsCommande as $produit) {
        $idProduit = $produit->idProduit;
        $nomProduit = $produit->nomProduit;
        $prixProduit = $produit->prixProduit;
        $quantiteProduit = $produit->quantiteProduit;

        // Vérifier si la quantité à soustraire dépasse le stock actuel
        $selectQuery = "SELECT stock FROM produits WHERE id = :idProduit";
        $selectStmt = $pdo->prepare($selectQuery);
        $selectStmt->bindParam(":idProduit", $idProduit);
        $selectStmt->execute();
        $currentStock = $selectStmt->fetchColumn();

        if ($quantiteProduit > $currentStock) {
            // Stock insuffisant, renvoyer une erreur
            $response = array("status" => "error", "message" => "Erreur, le stock est insuffisant pour le produit : $nomProduit");
            echo json_encode($response);
            exit();
        }

        // Mettre à jour le stock
        $sqlUpdateStock = "UPDATE produits SET stock = stock - :quantiteProduit WHERE id = :idProduit";
        $stmtUpdateStock = $pdo->prepare($sqlUpdateStock);
        $stmtUpdateStock->bindParam(":quantiteProduit", $quantiteProduit);
        $stmtUpdateStock->bindParam(":idProduit", $idProduit);
        $stmtUpdateStock->execute();

        // Insérer les détails de la commande_produit
        $queryProduit = "INSERT INTO commande_produit (id_commande, id_produit, nom_produit, prix_produit, quantite_produit)
                         VALUES (:commandeId, :idProduit, :nomProduit, :prixProduit, :quantiteProduit)";
        $stmtProduit = $pdo->prepare($queryProduit);
        $stmtProduit->bindParam(":commandeId", $commandeId);
        $stmtProduit->bindParam(":idProduit", $idProduit);
        $stmtProduit->bindParam(":nomProduit", $nomProduit);
        $stmtProduit->bindParam(":prixProduit", $prixProduit);
        $stmtProduit->bindParam(":quantiteProduit", $quantiteProduit);
        $stmtProduit->execute();
    }

    $response = array("status" => "success", "message" => "Nouvelle commande créée avec succès", "commandeId" => $commandeId);
    echo json_encode($response);
} catch (PDOException $e) {
    $response = array("status" => "error", "message" => "Erreur lors de la création de la commande : " . $e->getMessage());
    echo json_encode($response);
}
?>
