<?php
require_once __DIR__ . '/../config/dbConnection.php';
require_once __DIR__ . '/../models/prestationModel.php';

// Lister toutes les prestations
function handleListerPrestation() {
    global $pdo;
    return ListerPrestation($pdo);
}

// Créer une prestation
function handleCreatePrestation($id, $prix, $description) {
    global $pdo;
    return createPrestation($pdo, $id, $prix, $description);
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