<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));

$nom = $data->nom;
$password = $data->password;

// Connexion à la base de données
try {
    $db = new PDO('mysql:host=localhost;dbname=airneis;charset=utf8', 'airneis', 'Admin1234!');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Si la connexion échoue, on renvoie une réponse d'erreur
    $response = array('status' => 'error', 'error' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}

if (!empty($nom) && !empty($password)) {
    $request = $db->prepare('SELECT * FROM espace_administrateur WHERE nom = :nom');
    $request->execute(array('nom' => $nom));

    $userExist = $request->fetch();

    if ($userExist) {
        $hashed_password = $userExist['password'];
        if (password_verify($password, $hashed_password)) {
            $response = array('status' => 'success', 'message' => 'Connexion réussie!', 'loggedIn' => true);
        } else {
            $response = array('status' => 'error', 'error' => 'Mot de passe incorrect.');
        }
    } else {
        $response = array('status' => 'error', 'error' => 'Nom incorrect.');
    }
} else {
    $response = array('status' => 'error', 'error' => 'Les champs sont vides.');
    echo json_encode($response);
    exit();
}

echo json_encode($response);
?>
