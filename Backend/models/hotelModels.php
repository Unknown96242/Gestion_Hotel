<?php

    //Creation d'un hotel
    function CreateHotel(PDO $pdo,$nom_hotel, $nombres_chambres,$pays,$addresse,$image_hotel){        

        $SQL = "INSERT INTO hotel (nom_hotel, nombres_chambres,pays,addresse,image_hotel) VALUES(?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($SQL);
        $stmt->execute([$nom_hotel, $nombres_chambres,$pays,$addresse,$image_hotel]);

        return $stmt->rowCount()>0;
    }

    // Recuperer toutes les hotels
    function GetHotel(PDO $pdo){
        $SQL= "SELECT * FROM hotel";
        $stmt = $pdo->query($SQL);
        $allHotel= $stmt->fetchAll();

        return $allHotel;
    }

     //Modifier un htoel
    function UpdateHotel(PDO $pdo, $image_hotel, $addresse, $id) {
    $SQL= "UPDATE hotel SET image_hotel = ?, addresse = ?  WHERE id=?";
    $stmt = $pdo->prepare($SQL);
    $stmt->execute([ $image_hotel, $addresse, $id]);
    return $stmt->rowCount()>0;
    }

    // Supprimer un hotel
    function DeleteHotel(PDO $pdo, $id){
        $SQL= "DELETE * FROM hotel WHERE id=?";
        $stmt= $pdo->prepare($SQL);
        $stmt->execute([$id]);

        return $stmt->rowCount()>0;
    }