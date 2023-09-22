<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// Démarre la session
session_start();

// Si l'utilisateur n'est pas connecté, renvoie une réponse d'erreur
if(!isset($_SESSION['user'])){
    $response = array('status' => 'error', 'message' => 'Vous n\'êtes pas connecté.');
    echo json_encode($response);
    exit();
}

// Détruit la session
session_destroy();

$response = array('status' => 'success', 'message' => 'Vous avez été déconnecté.');
echo json_encode($response);
?>