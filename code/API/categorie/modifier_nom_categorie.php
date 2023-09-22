<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Vérifier si la requête est de type POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Récupérer les données du formulaire
  $id = $_POST['id'];
  $ancienNom = $_POST['ancienNom'];
  $nouveauNom = $_POST['nom'];

  // Vérifier si l'ID et le nouveau nom sont présents
  if (isset($id) && isset($nouveauNom) && isset($ancienNom)) {
    // Connexion à la base de données
    $conn = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');
    if ($conn->connect_error) {
      die('La connexion à la base de données a échoué : ' . $conn->connect_error);
    }

    // Mettre à jour le nom de la catégorie dans la base de données
    $request = $conn->prepare('UPDATE categorie SET nom = :nom WHERE id_categorie = :id');
    $request->bindParam(':nom', $nouveauNom);
    $request->bindParam(':id', $id);
    $request->execute();

    // Vérifier si la mise à jour a été effectuée avec succès
    if ($request) {
      // Succès : la catégorie a été mise à jour
	  echo json_encode(['status' => 'success', 'message' => 'Le nom de la catégorie a été modifié avec succès.']);
    } else {
      // Échec : la mise à jour a échoué
	  echo json_encode(['status' => 'error', 'message' => 'La mise à jour du nom de la catégorie a échoué.']);
    }

    // Fermer la connexion à la base de données
    $conn = null;
  } else {
    // Échec : les paramètres requis ne sont pas présents
	echo json_encode(['status' => 'error', 'message' => 'Paramètres manquants.']);
  }
} else {
  // Échec : la requête n'est pas de type POST
  echo json_encode(['status' => 'error', 'message' => 'Mauvaise méthode de requête.']);
}
?>
