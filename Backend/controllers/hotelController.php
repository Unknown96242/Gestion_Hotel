<?php
require_once __DIR__ . '/../config/dbConnection.php';
require_once __DIR__ . '/../models/hotelModel.php';

// Créer un hotel
function handleCreateHotel($nom_hotel, $nombres_chambres, $pays, $addresse, $image_hotel) {
    global $pdo;
    return createCategorie($pdo, $nom_hotel, $nombres_chambres, $pays, $addresse, $image_hotel);
}

// Récupérer tout les hotels
function handleGetHotel() {
    global $pdo;
    return getHotel($pdo);
}

// Modifier une catégorie
function handleModifierHotel($nom_hotel, $nombres_chambres, $pays, $addresse, $image_hotel, $id) {
    global $pdo;
    return modifierHotel($pdo, $nom_hotel, $nombres_chambres, $pays, $addresse, $image_hotel, $id);
}

// Supprimer un hotel
function handleSupprimerHotel($id) {
    global $pdo;
    return supprimerHotel($pdo, $id);
}