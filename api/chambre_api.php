<?php
require_once __DIR__ . '/../Backend/controllers/chambreController.php';
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
        // Récupérer toutes les chambres ou seulement les disponibles
        if (isset($_GET['status'])) {
            $chambres = handleGetChambreDispo($_GET['status']);
        }else {
            $chambres = handleGetChambre();
        }
        echo json_encode($chambres);
        break;

    case 'POST':
        // Créer une nouvelle chambre
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['numero_fixe'], $data['description'], $data['id_categorie_fk'], $data['id_hotel_fk'])) {
            $disponibilite = isset($data['disponibilite']) ? $data['disponibilite'] : true;
            $result = handleCreateChambre($data['numero_fixe'], $data['description'], $data['id_categorie_fk'], $data['id_hotel_fk'], $disponibilite);
            echo json_encode(['success' => $result]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
        }
        break;

    case 'PUT':
        // Modifier une chambre
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['idChambre'], $data['numero_fixe'], $data['description'], $data['id_categorie_fk'], $data['id_hotel_fk'], $data['disponibilite'])) {
            $result = handleModifierChambre($data['idChambre'], $data['numero_fixe'], $data['description'], $data['id_categorie_fk'], $data['id_hotel_fk'], $data['disponibilite']);
            echo json_encode(['success' => $result]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
        }
        break;

    case 'DELETE':
        // Supprimer une chambre
        parse_str(file_get_contents('php://input'), $data);
        if (isset($data['idChambre'])) {
            $result = handleSupprimerChambre($data['idChambre']);
            echo json_encode(['success' => $result]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètre idChambre manquant']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
        break;
}