<?php
require_once __DIR__ . '/../config/dbConnection.php';
require_once __DIR__ . '/../models/ClientModel.php';

// Ajouter un client
function handleAjouterClient($nom, $prenom, $age, $login, $mot_de_passe) {
    return ajouterClient($nom, $prenom, $age, $login, $mot_de_passe);
}

// Modifier un client
function handleModifierClient($id, $nom, $prenom, $age, $login, $mot_de_passe) {
    return modifierClient($id, $nom, $prenom, $age, $login, $mot_de_passe);
}

// Supprimer un client
function handleSupprimerClient($id) {
    return supprimerClient($id);
}

// Récupérer un client
function handleGetClient($id) {
    return getClient($id);
}