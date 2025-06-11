<?php
require_once __DIR__ . '/../Backend/controllers/hotelController.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Définir le type de réponse
header('Content-Type: application/json');

// Récupérer la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Récupérer toutes les catégories
        $hotels = handleGetHotel();
        echo json_encode($hotels);
        break;

    case 'POST':
        // Créer d'un nouvel hotel
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['nom_hotel'], $data['nombres_chambres'], $data['pays'], $data['adresse'], $data['image_hotel'])) {
            $result = handleCreateHotel($data['nom_hotel'], $data['nombres_chambres'], $data['pays'], $data['adresse'], $data['image_hotel']);
            if ($result) {
                http_response_code(201);
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => "Erreur lors de la création de l'hotel"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
        }
        break;

    case 'PUT':
        // Modifier un hotel
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset( $data['nom_hotel'], $data['nombres_chambres'], $data['pays'], $data['adresse'], $data['image_hotel'])) {
            $result = handleModifierHotel($data['nom_hotel'], $data['nombres_chambres'], $data['pays'], $data['adresse'], $data['image_hotel']);
            if ($result) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'hotel non trouvée ou non modifiée']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
        }
        break;

    case 'DELETE':
        // Supprimer un hotel
        parse_str(file_get_contents('php://input'), $data);
        if (isset($data['id'])) {
            $result = handleSupprimerHotel($data['id']);
            if ($result) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'hotel non trouvée ou non supprimée']);
            }
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