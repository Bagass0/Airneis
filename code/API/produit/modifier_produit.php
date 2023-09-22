<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$data = $_POST;

$id = $data['id'];

// Connexion à la base de données
try {
    $db = new PDO('mysql:host=localhost;dbname=airneis;charset=utf8', 'airneis', 'Admin1234!');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Si la connexion échoue, on renvoie une réponse d'erreur
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

if (!empty($id)) {
    // Mettre à jour les données dans la base de données

    if (!empty($data['nom'])) {
        $nom = $data['nom'];
        $request = $db->prepare('UPDATE produits SET nom = :nom WHERE id = :id');
        $request->execute(array(
            'id' => $id,
            'nom' => $nom,
        ));

        // Vérifier si la mise à jour a réussi
        if ($request) {
            $response = array('status' => 'success', 'message' => 'Nom modifié avec succès');
        } else {
            $response = array('status' => 'error', 'message' => 'Erreur lors de la modification du nom');
        }
    }

    if (!empty($data['description'])) {
        $description = $data['description'];
        $request = $db->prepare('UPDATE produits SET description = :description WHERE id = :id');
        $request->execute(array(
            'id' => $id,
            'description' => $description,
        ));

        // Vérifier si la mise à jour a réussi
        if ($request) {
            $response = array('status' => 'success', 'message' => 'Description modifiée avec succès');
        } else {
            $response = array('status' => 'error', 'message' => 'Erreur lors de la modification de la description');
        }
    }

    if (!empty($data['prix'])) {
        $prix = $data['prix'];
        $request = $db->prepare('UPDATE produits SET prix = :prix WHERE id = :id');
        $request->execute(array(
            'id' => $id,
            'prix' => $prix,
        ));

        // Vérifier si la mise à jour a réussi
        if ($request) {
            $response = array('status' => 'success', 'message' => 'Prix modifié avec succès');
        } else {
            $response = array('status' => 'error', 'message' => 'Erreur lors de la modification du prix');
        }
    }

    if (!empty($data['categorie'])) {
        $categorie = $data['categorie'];
        $request = $db->prepare('UPDATE produits SET categorie = :categorie WHERE id = :id');
        $request->execute(array(
            'id' => $id,
            'categorie' => $categorie,
        ));

        // Vérifier si la mise à jour a réussi
        if ($request) {
            $response = array('status' => 'success', 'message' => 'Catégorie modifiée avec succès');
        } else {
            $response = array('status' => 'error', 'message' => 'Erreur lors de la modification de la catégorie');
        }
    }
	
	if (!empty($data['materiau'])) {
        $materiau = $data['materiau'];
        $request = $db->prepare('UPDATE produits SET materiau = :materiau WHERE id = :id');
        $request->execute(array(
            'id' => $id,
            'materiau' => $materiau,
        ));

        // Vérifier si la mise à jour a réussi
        if ($request) {
            $response = array('status' => 'success', 'message' => 'Matériau modifiée avec succès');
        } else {
            $response = array('status' => 'error', 'message' => 'Erreur lors de la modification du matériau');
        }
    }

    if (!empty($data['stock'])) {
        $stock = $data['stock'];
        $request = $db->prepare('UPDATE produits SET stock = :stock WHERE id = :id');
        $request->execute(array(
            'id' => $id,
            'stock' => $stock,
        ));

        // Vérifier si la mise à jour a réussi
        if ($request) {
            $response = array('status' => 'success', 'message' => 'Stock modifié avec succès');
        } else {
            $response = array('status' => 'error', 'message' => 'Erreur lors de la modification du stock');
        }
    }	
} else {
    $response = array('status' => 'error', 'message' => 'L\'identifiant du produit est requis');
}

echo json_encode($response);
?>
