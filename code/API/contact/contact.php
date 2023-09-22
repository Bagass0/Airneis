<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));

$nom = $data->nom;
$email = $data->email;
$message = $data->message;

echo 'Nom: ' . $nom . PHP_EOL;
echo 'Email: ' . $email . PHP_EOL;
echo 'Message: ' . $message . PHP_EOL;

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

if (!empty($email) && !empty($message)) {
	//Envoie des donnees dans la bdd
	$request = $db->prepare('INSERT INTO contact (nom, email, message) VALUES (:nom, :email, :message)');
    $request->execute(array('nom' => $nom, 'email' => $email, 'message' => $message));
    $response = array('status' => 'success', 'message' => 'Message envoyé !');
	http_response_code(204);

} 
else {
    $response = array('status' => 'error', 'message' => 'Les champs sont vides.');
}

echo json_encode($response);
?>