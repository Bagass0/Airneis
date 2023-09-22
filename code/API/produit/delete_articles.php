<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$images = $data->images;

if (!empty($images)) { 
  $servername = "localhost";
  $username = "airneis";
  $password = "Admin1234!";
  $dbname = "airneis";

  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Configure PDO pour qu'il retourne des tableaux associatifs
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    // Active les exceptions PDO pour les erreurs de requête
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch(PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
  }

  foreach ($images as $image) {
    $id = $image->id;
    $sql = "DELETE FROM `produits` WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id]);

    $imagePath2 = '../img_produit/' .$id ."-2.jpg";
    $imagePath3 = '../img_produit/' .$id ."-3.jpg";

    if (file_exists($imagePath2)) {
      if (unlink($imagePath2)) {
        $response = array('status'=> 'success', 'message' => 'Articles supprimés avec succès.');
      } else {
        $response = array('status' => 'error', 'error' => 'Une erreur s\'est produite lors de la suppression de l\'image.');
      }
    }

    if (file_exists($imagePath3)) {
      if (unlink($imagePath3)) {
        $response = array('status'=> 'success', 'message' => 'Articles supprimés avec succès.');
      } else {
        $response = array('status' => 'error', 'error' => 'Une erreur s\'est produite lors de la suppression de l\'image.');
      }
    }
  }  

  $conn = null;

} else {
  $response = array('status' => 'error', 'error' => 'Veuillez choisir un article.');
}

echo json_encode($response);

?>
