<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
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


  $sql = "UPDATE produits SET featured = 0";
  $stmt = $conn->prepare($sql);
  $stmt->execute();


  foreach ($images as $image) {
    $id = $image->id;
    $sql = "UPDATE produits SET featured = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id]);
  }

  $conn = null;

  $response = array('status' => 'success', 'message' => 'Articles en exposition bien modifiés.');
} else {
    
  $response = array('status' => 'error', 'error' => 'Veuillez choisir un article.');
}

echo json_encode($response);

?>