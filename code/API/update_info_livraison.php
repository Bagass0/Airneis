<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$accountId = $data->accountId;
$nomAdresse = $data->nomAdresse;
$nom = $data->nom;
$prenom = $data->prenom;
$adresseLivraison = $data->adresseLivraison;
$adresseLivraison2 = $data->adresseLivraison2;
$codePostalLivraison = $data->codePostalLivraison;
$villeLivraison = $data->villeLivraison;
$pays = $data->pays;

try {
    $pdo = new PDO("mysql:host=localhost;dbname=airneis", "airneis", "Admin1234!");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

if (isset($id)) {
	$query = "UPDATE livraison SET nom_adresse = :nomAdresse, nom = :nom, prenom = :prenom, adresse1 = :adresseLivraison, adresse2 = :adresseLivraison2, code_postal = :codePostalLivraison, ville = :villeLivraison, pays = :pays WHERE id = :id";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":nomAdresse", $nomAdresse);
	$stmt->bindParam(":nom", $nom);
	$stmt->bindParam(":prenom", $prenom);
	$stmt->bindParam(":adresseLivraison", $adresseLivraison);
	$stmt->bindParam(":adresseLivraison2", $adresseLivraison2);
	$stmt->bindParam(":codePostalLivraison", $codePostalLivraison);
	$stmt->bindParam(":villeLivraison", $villeLivraison);
	$stmt->bindParam(":pays", $pays);
	$stmt->bindParam(":id", $id);

	try {
		$stmt->execute();
	} catch (PDOException $e) {
		$response = array("status" => "error", "message" => "Erreur lors de la mise à jour des informations de livraison");
		echo json_encode($response);
		exit();       
	}

	$response = array("status" => "success", "message" => "Informations de livraison mises à jour avec succès");
	echo json_encode($response);

} else {
	$query = "INSERT INTO livraison (id_compte, nom_adresse, nom, prenom, adresse1, adresse2, code_postal, ville, pays) VALUES (:accountId, :nomAdresse, :nom, :prenom, :adresseLivraison, :adresseLivraison2, :codePostalLivraison, :villeLivraison, :pays)";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":accountId", $accountId);
	$stmt->bindParam(":nomAdresse", $nomAdresse);
	$stmt->bindParam(":nom", $nom);
	$stmt->bindParam(":prenom", $prenom);
	$stmt->bindParam(":adresseLivraison", $adresseLivraison);
	$stmt->bindParam(":adresseLivraison2", $adresseLivraison2);
	$stmt->bindParam(":codePostalLivraison", $codePostalLivraison);
	$stmt->bindParam(":villeLivraison", $villeLivraison);
	$stmt->bindParam(":pays", $pays);

	try {
		$stmt->execute();
		$response = array("status" => "success", "message" => "Nouvelle adresse de livraison créée avec succès");
		echo json_encode($response);
	} catch (PDOException $e) {
		$response = array("status" => "error", "message" => "Erreur lors de la création de l'adresse de livraison");
		echo json_encode($response);
	}
}
?>
