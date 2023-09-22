<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$data = $_POST; // Récupérer les données du formulaire envoyées en tant que `multipart/form-data`

$nom = $data['nom'];
$description = $data['description'];
$prix = $data['prix'];
$categorie = $data['categorie'];
$materiau = $data['materiau'];
$image = $_FILES['image']; // Récupérer le fichier image
$image2 = $_FILES['image2']; // Récupérer le fichier image2
$image3 = $_FILES['image3']; // Récupérer le fichier image3
$stock = $data['stock'];

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

// Vérifier si tous les champs nécessaires sont présents
if (!empty($nom) && !empty($description) && !empty($prix) && !empty($categorie) && !empty($materiau)&& !empty($stock)) {

    // Insérer les données dans la base de données
    $request = $db->prepare('INSERT INTO produits (nom, description, prix, categorie, stock, materiau) VALUES (:nom, :description, :prix, :categorie, :stock, :materiau)');
    $request->execute(array(
        'nom' => $nom,
        'description' => $description,
        'prix' => $prix,
        'categorie' => $categorie,
		'materiau' => $materiau,
        'stock' => $stock
    ));

    // Vérifier si l'insertion a réussi
    if ($request) {
        $response = array('status' => 'success', 'message' => 'Produit ajouté avec succès');

        // Vérifier si un fichier est téléchargé pour l'image
        if (isset($_FILES['image'])) {
            $imageFile = $_FILES['image'];
            $imageFile2 = $_FILES['image2'];
            $imageFile3 = $_FILES['image3'];

            // Récupérer l'ID du dernier enregistrement inséré
            $lastInsertId = $db->lastInsertId();

            // Vérifier s'il y a eu une erreur lors du téléchargement de l'image 1
            if ($imageFile['error'] === 0) {
                $imageName = $lastInsertId . '.jpg'; // Nom de l'image 1
                $imageTmpName = $imageFile['tmp_name'];

                // Chemin de destination complet pour l'image 1
                $imageDestinationPath = '../img_produit/' . $imageName;

                // Déplacer le fichier image 1 vers le dossier de destination
                move_uploaded_file($imageTmpName, $imageDestinationPath);
            } else {
                $response = array('status' => 'error', 'message' => 'Erreur lors du téléchargement de l\'image 1');
            }

            // Vérifier s'il y a eu une erreur lors du téléchargement de l'image 2
            if ($imageFile2['error'] === 0) {
                $imageName2 = $lastInsertId . '-2.jpg'; // Nom de l'image 2
                $imageTmpName2 = $imageFile2['tmp_name'];

                // Chemin de destination complet pour l'image 2
                $imageDestinationPath2 = '../img_produit/' . $imageName2;

                // Déplacer le fichier image 2 vers le dossier de destination
                move_uploaded_file($imageTmpName2, $imageDestinationPath2);
            } else {
                $response = array('status' => 'error', 'message' => 'Erreur lors du téléchargement de l\'image 2');
            }

            // Vérifier s'il y a eu une erreur lors du téléchargement de l'image 3
            if ($imageFile3['error'] === 0) {
                $imageName3 = $lastInsertId . '-3.jpg'; // Nom de l'image 3
                $imageTmpName3 = $imageFile3['tmp_name'];

                // Chemin de destination complet pour l'image 3
                $imageDestinationPath3 = '../img_produit/' . $imageName3;

                // Déplacer le fichier image 3 vers le dossier de destination
                move_uploaded_file($imageTmpName3, $imageDestinationPath3);
            } else {
                $response = array('status' => 'error', 'message' => 'Erreur lors du téléchargement de l\'image 3');
            }
        } else {
            $response = array('status' => 'error', 'message' => 'Aucune image téléchargée');
        }
    } else {
        $response = array('status' => 'error', 'message' => 'Erreur lors de l\'ajout du produit');
    }
} else {
    $response = array('status' => 'error', 'error' => 'Tous les champs sont requis');
}

echo json_encode($response);
?>
