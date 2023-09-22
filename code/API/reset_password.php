<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$request = json_decode(file_get_contents("php://input"));

if (!isset($request->id) || !isset($request->password)) {
    $response = ['status' => 'error', 'message' => 'Requête mal formée.'];
    echo json_encode($response);
    exit();
}

$id = $request->id;
$newPassword = $request->password;

$newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

$db = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $db->prepare("UPDATE espace_membres SET password = :newPassword, reset = 0, reset_time = NULL WHERE id = :id");
$stmt->bindParam(':newPassword', $newPasswordHash);
$stmt->bindParam(':id', $id);
$stmt->execute();

$response = ['status' => 'success', 'message' => 'Mot de passe modifié avec succès'];
echo json_encode($response);
?>
