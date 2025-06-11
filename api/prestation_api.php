<?php
require_once __DIR__ . '/../Backend/controllers/prestationController.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lister toutes les prestations
        // Si un id est passé en paramètre, on récupère la prestation par son id
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $prestations = handleListerPrestation($id);
            if ($prestations) {
                echo json_encode($prestations);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Prestation non trouvée']);
            }
            exit();
        }
        $prestations = handleListerPrestation();
        echo json_encode($prestations);
        break;

    case 'POST':
        // Créer une prestation
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset( $data['prix'], $data['description'])) {
            $result = handleCreatePrestation($data['prix'], $data['description']);
            echo json_encode(['success' => $result]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
        }
        break;

    case 'PUT':
        // Modifier une prestation
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'], $data['prix'], $data['description'])) {
            $result = handleModifierPrestation($data['id'], $data['prix'], $data['description']);
            echo json_encode(['success' => $result]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
        }
        break;

    case 'DELETE':
        // Supprimer une prestation
        // Récupérer l'id depuis la query string (car le JS envoie .../prestation_api.php?id=XX)
        if (isset($_GET['id'])) {
            $result = handleSupprimerPrestation($_GET['id']);
            echo json_encode(['success' => $result]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètre id manquant']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
        break;
}