<?php 
require_once __DIR__ . '/../Backend/controllers/prestationControllers.php';
require_once __DIR__ . '/../Backend/controllers/reservationControllers.php';

header('Content-Type: application/json');
// Récupération de la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        // Ajouter une prestation à une réservation
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id_reservation']) || !isset($data['id_prestation'])) {
            http_response_code(400); // Mauvaise requête
            echo json_encode(["error" => "Paramètres manquants"]);
            exit;
        }
        $result = AjouterPrestationReservation($pdo, $data['id_reservation'], $data['id_prestation']);
        echo json_encode($result);
        break;

    default:
        http_response_code(405); // Méthode non autorisée
        echo json_encode(["error" => "Méthode non autorisée"]);
}