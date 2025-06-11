<?php
require_once __DIR__ . '/../config/dbConnection.php';
require_once __DIR__ . '/../models/prestationModel.php';

// Lister toutes les prestations
function handleListerPrestation() {
    global $pdo;
    return ListerPrestation($pdo);
}
function handleListerPrestationId($id) {
    global $pdo;
    return ListerPrestationId($pdo, $id);
}

// Créer une prestation
function handleCreatePrestation($prix, $description) {
    global $pdo;
    return createPrestation($pdo, $prix, $description);
}

// Modifier une prestation
function handleModifierPrestation($id, $prix, $description) {
    global $pdo;
    return modifierPrestation($pdo, $id, $prix, $description);
}

// Supprimer une prestation
function handleSupprimerPrestation($id) {
    global $pdo;
    return supprimerPrestation($pdo, $id);
}