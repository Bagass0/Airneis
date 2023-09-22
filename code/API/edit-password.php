<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Récupérer les données de la requête POST
$data = json_decode(file_get_contents('php://input'));

// Établir la connexion à la base de données
$host = 'localhost'; // Adresse du serveur MySQL
$dbname = 'airneis'; // Nom de votre base de données
$username = 'airneis'; // Nom d'utilisateur MySQL
$password = 'Admin1234!'; // Mot de passe MySQL

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Gérer les erreurs de connexion à la base de données
    echo "Erreur de connexion à la base de données: " . $e->getMessage();
    exit();
}

// Récupérer les données du formulaire
$accountId = $data->accountId;
$oldPassword = $data->oldPassword;
$newPassword = $data->newPassword;

// Vérifier si l'ancien mot de passe correspond à celui enregistré dans la base de données
$stmt = $db->prepare("SELECT password FROM espace_membres WHERE id = :accountId");
$stmt->bindParam(':accountId', $accountId);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    // L'utilisateur n'existe pas
    $response = [
        'status' => 'error',
        'message' => 'Utilisateur non trouvé'
    ];
    echo json_encode($response);
    exit();
}

$storedPassword = $row['password'];

if (!password_verify($oldPassword, $storedPassword)) {
    // L'ancien mot de passe est incorrect
    $response = [
        'status' => 'error',
        'message' => 'Ancien mot de passe incorrect'
    ];
    echo json_encode($response);
    exit();
}

// Générer le hash du nouveau mot de passe
$newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

// Mettre à jour le mot de passe dans la base de données
$stmt = $db->prepare("UPDATE espace_membres SET password = :newPassword WHERE id = :accountId");
$stmt->bindParam(':newPassword', $newPasswordHash);
$stmt->bindParam(':accountId', $accountId);
$stmt->execute();

// Répondre avec le statut de réussite
$response = [
    'status' => 'success',
    'message' => 'Mot de passe modifié avec succès'
];
echo json_encode($response);
