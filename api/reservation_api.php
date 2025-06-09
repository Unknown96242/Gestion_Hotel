<?php
require_once __DIR__ . '/../Backend/controllers/reservationController.php';
// Autoriser les requêtes CORS
// Permettre l'accès à toutes les origines, méthodes et en-têtes
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
// Récupération de la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lister les réservations
        if (isset($_GET['id_client_fk']) && isset($_GET['status'])) {
            // Lister les réservations par client et statut
            $id_client_fk = $_GET['id_client_fk'];
            $status = $_GET['status'];
            $reservations = ListerReservationByClientAndStatusOrS($pdo, $id_client_fk, $status);
            echo json_encode($reservations);
            exit;
        }
        $reservations = ListerReservation($pdo);
        echo json_encode($reservations);
        break;

    case 'POST':
        // Créer une nouvelle réservation
        $data = json_decode(file_get_contents('php://input'), true);
        if (
            !isset($data['id_client_fk']) ||
            !isset($data['status']) ||
            !isset($data['mode_paiement']) ||
            !isset($data['date_limite']) ||
            !isset($data['date_deb']) ||
            !isset($data['date_fin']) ||
            !isset($data['cout_total']) ||
            !isset($data['id_chambre_fk']) 
        ) {
            http_response_code(400); // Mauvaise requête
            echo json_encode(["error" => "Paramètres manquants"]);
            exit;
        }
        if (!isset($data['id_prestation_fk'])) {
            $data['id_prestation_fk'] = null; // Si pas de prestation, on met à null
        }
        $result = createReservation(
            $pdo,
            $data['id_client_fk'],
            $data['status'],
            $data['mode_paiement'],
            $data['date_limite'],
            $data['date_deb'],
            $data['date_fin'],
            $data['cout_total'],
            $data['id_chambre_fk'],
            $data['id_prestation_fk']
        );
        if ($result) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Erreur lors de la création']);
        }
        file_put_contents('debug_reservation.log', print_r($data, true)); // Écrit dans un fichier
        break;

    case 'PUT':
        // Modifier une réservation existante
        parse_str(file_get_contents("php://input"), $_PUT);
        if (!isset($_PUT['id_client_fk']) || !isset($_PUT['mode_paiement']) || !isset($_PUT['date_limite']) || !isset($_PUT['date_deb']) || !isset($_PUT['date_fin']) || !isset($_PUT['cout_total']) || !isset($_PUT['id_chambre']) || !isset($_PUT['id_prestation_fk']) ) {
            if (!isset($_PUT['id']) || !isset($_PUT['status'])) {
                http_response_code(400); // Mauvaise requête
                echo json_encode(["error" => "Paramètres manquants"]);
                exit;
            }
            $result = ModifierStatutReservation($pdo, $_PUT['id'], $_PUT['status']);
        }else {
            $result = updateReservation($pdo, $_PUT['id'], $_PUT['id_client_fk'], $_PUT['status'], $_PUT['mode_paiement'], $_PUT['date_limite'], $_PUT['date_deb'], $_PUT['date_fin'], $_PUT['cout_total'], $_PUT['id_chambre'], $_PUT['id_prestation_fk']);
        }
        echo json_encode($result);
        break;

    case 'DELETE':
        // Supprimer une réservation
        parse_str(file_get_contents("php://input"), $_DELETE);
        if (!isset($_DELETE['id'])) {
            http_response_code(400); // Mauvaise requête
            echo json_encode(["error" => "Paramètre id manquant"]);
            exit;
        }
        $result = deleteReservation($pdo, $_DELETE['id']);
        echo json_encode(['success' => $result]);
        break;

    default:
        http_response_code(405); // Méthode non autorisée
        echo json_encode(["error" => "Méthode non autorisée"]);
}
