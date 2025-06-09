<?php

    //Creation d'un hotel
    function createHotel(PDO $pdo,$nom_hotel, $nombres_chambres, $pays, $addresse, $image_hotel){        

        $SQL_INSERT_HOTEL = "INSERT INTO hotel (nom_hotel, nombres_chambres, pays, addresses, image_hotel) VALUES(?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($SQL_INSERT_HOTEL);
        $stmt->execute([$nom_hotel, $nombres_chambres, $pays, $addresse, $image_hotel]);

        return $stmt->rowCount()>0;
    }

    // Recuperer tout les hotels
    function getHotel(PDO $pdo){

        $SQL_SELECT_HOTEL = "SELECT * FROM hotel";
        $stmt = $pdo->query($SQL_SELECT_HOTEL);
        $allHotel = $stmt->fetchAll();

        return $allHotel;
    }

     //Modifier un hotel
    function modifierHotel(PDO $pdo, $nom_hotel, $nombres_chambres, $pays, $addresse, $image_hotel, $id) {
    $SQL_UPDATE_HOTEL = "UPDATE hotel SET nom_hotel = ?, nombres_chambres = ?  WHERE id=?";
    $stmt = $pdo->prepare($SQL_UPDATE_HOTEL);
    $stmt->execute([$nom_hotel, $nombres_chambres, $pays, $addresse, $image_hotel, $id]);
    return $stmt->rowCount()>0;
    }

    // Supprimer hotel
    function supprimerHotel(PDO $pdo, $id){
        $SQL_DELETE_HOTEL = "DELETE * FROM hotel WHERE id=?";
        $stmt= $pdo->prepare($SQL_DELETE_HOTEL);
        $stmt->execute([$id]);

        return $stmt->rowCount()>0;
    }