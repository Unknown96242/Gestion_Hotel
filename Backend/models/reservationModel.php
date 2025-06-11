<?php
// Lister toutes les réservations avec infos client, chambre et prestation
function ListerAllReservation(PDO $pdo) {
    $sql = "SELECT 
                reservation.id AS reservation_id,
                client.id AS client_id,
                client.nom AS client_nom,
                client.prenom AS client_prenom,
                chambre.id AS chambre_id,
                chambre.num_chambre AS chambre_numero,
                chambre.description AS chambre_description,
                prestation.id AS prestation_id,
                prestation.description AS prestation_description,
                reservation.* 
            FROM reservation
            INNER JOIN client ON client.id = reservation.id_client_fk
            INNER JOIN chambre ON chambre.id = reservation.id_chambre_fk
            LEFT JOIN prestation ON prestation.id = reservation.id_prestation_fk";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}
//recuperer une reservation par son id
function ListerOnReservationById(PDO $pdo, $id) {
    $sql = "SELECT reservation.*, 
                   client.nom, client.prenom, client.age, client.login, client.mot_de_passe,
                   chambre.id AS chambre_id, chambre.num_chambre, chambre.description AS chambre_description
            FROM reservation
            INNER JOIN client ON client.id = reservation.id_client_fk
            INNER JOIN chambre ON chambre.id = reservation.id_chambre_fk
            WHERE reservation.id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    return $stmt->fetch();
}
// Creation de la reservation
function createNewReservation(PDO $pdo, $id_client_fk, $status, $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre_fk, $id_prestation_fk) {
    $sql = "INSERT INTO reservation(id_client_fk, status, mode_paiement, date_limite, date_deb, date_fin, cout_total, id_chambre_fk, id_prestation_fk) VALUES(?,?,?,?,?,?,?,?,?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id_client_fk, $status, $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre_fk, $id_prestation_fk]);
    return $stmt->rowCount() > 0;
}
// Modifier une reservation
function updateOldReservation(PDO $pdo, $id, $id_client_fk, $status, $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre_fk, $id_prestation_fk) {
    $sql = "UPDATE reservation SET id_client_fk = ?, status = ?, mode_paiement = ?, date_limite = ?, date_deb = ?, date_fin = ?, cout_total = ?, id_chambre_fk = ?, id_prestation_fk = ? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id_client_fk, $status, $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre_fk, $id_prestation_fk, $id]);
    return $stmt->rowCount() > 0;
}
// Supprimer une reservation
function deleteThisReservation(PDO $pdo, $id) {
    $sql = "DELETE FROM reservation WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    return $stmt->rowCount() > 0;
}
//Modifier status de reservation
function ModifierStatutThisReservation(PDO $pdo, $id, $status) {
    $sql = "UPDATE reservation SET status =? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$status, $id]);
    return $stmt->rowCount() > 0;
}

// Lister les reservations par client et status de reservation
function ListerReservationByClientStatusOrS(PDO $pdo, $id_client_fk, $status) {
    $sql = "SELECT * FROM reservation WHERE id_client_fk = ? AND status = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id_client_fk, $status]);
    return $stmt->fetchAll();
}

//Ajouter prestation à la reservation
function AjouterPrestationToReservation(PDO $pdo, $id_reservation, $id_prestation) {
    $sql = "UPDATE reservation SET id_prestation_fk = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id_prestation, $id_reservation]);
    return $stmt->rowCount() > 0;
}