<?php
require_once __DIR__ . '/../config/dbConnection.php';
require_once __DIR__ . '/../models/chambreModel.php';

// Créer une chambre
function handleCreateChambre($numero_fixe, $description, $id_categorie_fk, $id_hotel_fk, $disponibilite = true) {
    global $pdo;
    return createChambre($pdo, $numero_fixe, $description, $id_categorie_fk, $id_hotel_fk, $disponibilite);
}

// Récupérer toutes les chambres
function handleGetChambre() {
    global $pdo;
    return getChambre($pdo);
}

// Récupérer les chambres disponibles
function handleGetChambreDispo() {
    global $pdo;
    return getChambreDispo($pdo);
}

// Récupérer les chambres non disponibles
function handleGetChambreNonDispo() {
    global $pdo;
    return getChambreNonDispo($pdo);
}

// Modifier une chambre
function handleModifierChambre($idChambre, $numero_fixe, $description, $id_categorie_fk, $id_hotel_fk, $disponibilite) {
    global $pdo;
    return modifierChambre($pdo, $idChambre, $numero_fixe, $description, $id_categorie_fk, $id_hotel_fk, $disponibilite);
}

// Supprimer une chambre
function handleSupprimerChambre($idChambre) {
    global $pdo;
    return supprimerChambre($pdo, $idChambre);
}

// Changer la catégorie d'une chambre
function handleChangeCategorie($idChambre, $id_categorie_fk) {
    global $pdo;
    return changeCategorie($pdo, $idChambre, $id_categorie_fk);
}

// Mettre à jour la disponibilité d'une chambre
function handleSetDisponibilite($idChambre, $disponibilite) {
    global $pdo;
    return setDisponibilite($pdo, $idChambre, $disponibilite);
}