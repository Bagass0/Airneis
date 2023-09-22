<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$accountId = $data->accountId;
$nom = $data->nom;
$numero = $data->numero;
$date = $data->date;
$cvv = $data->cvv;

try {
    $pdo = new PDO("mysql:host=localhost;dbname=airneis", "airneis", "Admin1234!");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

if (isset($id)) {
    $query = "UPDATE paiement SET nom = :nom, numero = :numero, date = :date, cvv = :cvv WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":nom", $nom);
    $stmt->bindParam(":numero", $numero);
    $stmt->bindParam(":date", $date);
    $stmt->bindParam(":cvv", $cvv);
    $stmt->bindParam(":id", $id);

    try {
        $stmt->execute();
        $response = array("status" => "success", "message" => "Informations de paiement mises à jour avec succès");
        echo json_encode($response);
    } catch (PDOException $e) {
        $response = array("status" => "error", "message" => "Erreur lors de la mise à jour des informations de paiement");
        echo json_encode($response);
    }
} else {
    $query = "INSERT INTO paiement (id_compte, nom, numero, date, cvv) VALUES (:accountId, :nom, :numero, :date, :cvv)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":accountId", $accountId);
    $stmt->bindParam(":nom", $nom);
    $stmt->bindParam(":numero", $numero);
    $stmt->bindParam(":date", $date);
    $stmt->bindParam(":cvv", $cvv);

    try {
        $stmt->execute();
        $response = array("status" => "success", "message" => "Nouveau moyen de paiement enregistré avec succès");
        echo json_encode($response);
    } catch (PDOException $e) {
        $response = array("status" => "error", "message" => "Erreur lors de l'enregistrement du nouveau moyen de paiement");
        echo json_encode($response);
    }
}
?>
