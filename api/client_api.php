<?php
require_once __DIR__ . '/../Backend/controllers/ClientController.php';

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Récupérer un client par id
        if (isset($_GET['id'])) {
            $client = handleGetClient($_GET['id']);
            echo json_encode($client);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètre id manquant']);
        }
        break;

    case 'POST':
        // Ajouter un client
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['nom'], $data['prenom'], $data['age'], $data['login'], $data['mot_de_passe'])) {
            $id = handleAjouterClient($data['nom'], $data['prenom'], $data['age'], $data['login'], $data['mot_de_passe']);
            echo json_encode(['id' => $id]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
        }
        break;

    case 'PUT':
        // Modifier un client
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'], $data['nom'], $data['prenom'], $data['age'], $data['login'], $data['mot_de_passe'])) {
            $result = handleModifierClient($data['id'], $data['nom'], $data['prenom'], $data['age'], $data['login'], $data['mot_de_passe']);
            echo json_encode(['success' => $result]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
        }
        break;

    case 'DELETE':
        // Supprimer un client
        parse_str(file_get_contents('php://input'), $data);
        if (isset($data['id'])) {
            $result = handleSupprimerClient($data['id']);
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