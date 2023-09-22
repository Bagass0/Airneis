<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id !== null) {
    try {
        $db = new PDO('mysql:host=localhost;dbname=airneis', 'airneis', 'Admin1234!');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
        echo json_encode($response);
        exit();
    }

    $query = $db->prepare('SELECT reset, password, reset_time FROM espace_membres WHERE id = :id AND reset_time >= NOW() - INTERVAL 5 MINUTE');
	$query->execute(array('id' => $id));
	$accountInfo = $query->fetch(PDO::FETCH_ASSOC);

	if ($accountInfo) {
		$response = array('status' => 'success', 'accountInfo' => array('reset' => $accountInfo['reset']));
	} else {
        $updateQuery = $db->prepare('UPDATE espace_membres SET reset = 0, reset_time = NULL WHERE id = :id');
        $updateQuery->execute(array('id' => $id));
        
        $response = array('status' => 'error', 'message' => 'Le lien a expiré ou aucune information de compte trouvée.');
    }


} else {
    $response = array('status' => 'error', 'message' => 'ID du compte non fourni.');
}

echo json_encode($response);
?>
