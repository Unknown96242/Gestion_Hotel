<?php
require_once __DIR__ . '/../config/dbConnection.php';
require_once __DIR__ . '/../models/categorieModel.php';

// Créer une catégorie
function handleCreateCategorie($description, $prixNuite) {
    global $pdo;
    return createCategorie($pdo, $description, $prixNuite);
}

// Récupérer toutes les catégories
function handleGetCategorie() {
    global $pdo;
    return getCategorie($pdo);
}

// Modifier une catégorie
function handleModifierCategorie($description, $prixNuite, $id) {
    global $pdo;
    return modifierCategorie($pdo, $description, $prixNuite, $id);
}

// Supprimer une catégorie
function handleSupprimerCategorie($id) {
    global $pdo;
    return supprimerCategorie($pdo, $id);
}