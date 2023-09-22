<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));

$nom = $data->nom;
$email = $data->email;
$password = $data->password;
$password2 = $data->password2;
$HashedPassword = password_hash($password, PASSWORD_DEFAULT);

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

if (!empty($email) && !empty($password)) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) 
    {
        $request = $db->prepare('SELECT COUNT(*) as count FROM espace_membres WHERE email = :email');
        $request->execute(array('email' => $email));
        $result = $request->fetch(PDO::FETCH_ASSOC);
        if ($result['count'] == 0) {
            if ($password === $password2) 
            {
                $request = $db->prepare('INSERT INTO espace_membres (nom, email, password) VALUES (:nom, :email, :password)');
                $request->execute(array('nom' => $nom, 'email' => $email, 'password' => $HashedPassword));
                $response = array('status' => 'success', 'message' => 'Compte a été crée !');
            }
            else 
            {
                $response = array('status' => 'error', 'error' => 'Les mots de passe doivent être identiques.');
            }
        } else {
            $response = array('status' => 'error', 'error' => 'L\'adresse mail existe déjà.');
        }
    } 
    else
    {
        $response = array('status' => 'error', 'error' => 'L\'adresse mail n\'est pas valide.');
    }
} 
else 
{
    $response = array('status' => 'error', 'error' => 'Les champs sont vides.');
}

echo json_encode($response);
