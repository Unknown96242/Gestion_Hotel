<?php
require_once __DIR__ . '/../config/dbConnection.php';
require_once __DIR__ . '/../models/reservationModel.php';
// Lister les reservations
function ListerReservation(PDO $pdo) {
    return ListerAllReservation($pdo);
}
// Créer une nouvelle reservation
function createReservation(PDO $pdo, $id_client_fk, $status, $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre, $id_prestation_fk) {
    // Vérification des paramètres obligatoires
    if (empty($id_client_fk) || empty($status) || empty($mode_paiement) || empty($date_deb) || empty($date_fin) || empty($id_chambre)) {
        return ["error" => "Paramètres manquants"];
    }
    // Vérification de la cohérence des dates
    if (strtotime($date_deb) > strtotime($date_fin)) {
        return ["error" => "La date de début doit être avant la date de fin"];
    }
    // Appel au modèle si tout est OK
    return createNewReservation($pdo, $id_client_fk, $status, $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre, $id_prestation_fk);
}
// Modifier une reservation existante
function updateReservation(PDO $pdo, $id, $id_client_fk, $status, $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre, $id_prestation_fk) {
    if (empty($id_client_fk) || empty($status) || empty($mode_paiement) || empty($date_deb) || empty($date_fin) || empty($id_chambre)) {
        return ["error" => "Paramètres manquants"];
    }
    // Vérification de la cohérence des dates
    if (strtotime($date_deb) > strtotime($date_fin)) {
        return ["error" => "La date de début doit être avant la date de fin"];
    }
    return updateOldReservation($pdo, $id, $id_client_fk, $status, $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre, $id_prestation_fk);
}
// Supprimer une reservation
function deleteReservation(PDO $pdo, $id) {
    // Vérification de l'existence de la reservation
    $reservation = ListerReservationById($pdo, $id);
    if (empty($reservation)) {
        return ["error" => "Reservation non trouvée"];
    }
    return deleteThisReservation($pdo, $id);
}
// Modifier le statut d'une reservation
function ModifierStatutReservation(PDO $pdo, $id, $status) {
    // Vérification de l'existence de la reservation
    $reservation = ListerReservationById($pdo, $id);
    if (empty($reservation)) {
        return ["error" => "Reservation non trouvée"];
    }
    return ModifierStatutThisReservation($pdo, $id, $status);
}
// Lister les reservations par client et statut
function ListerReservationByClientAndStatusOrS(PDO $pdo, $id_client_fk, $status) {
    // Vérification des paramètres
    if (empty($id_client_fk) || empty($status)) {
        return ["error" => "Paramètres manquants"];
    }
    return ListerReservationByClientStatusOrS($pdo, $id_client_fk, $status);
}
// Ajouter une prestation à une reservation
function AjouterPrestationReservation(PDO $pdo, $id_reservation, $id_prestation) {
    // Vérification de l'existence de la reservation
    $reservation = ListerReservationById($pdo, $id_reservation);
    if (empty($reservation)) {
        return ["error" => "Reservation non trouvée"];
    }
    return AjouterPrestationToReservation($pdo, $id_reservation, $id_prestation);
}
