<?php

    //Creation d'une categorie
    function createCategorie(PDO $pdo,$description, $prixNuite){        

        $SQL_INSERT_CATEGORIE = "INSERT INTO categorie (description, prixNuite) VALUES(?, ?)";
        $stmt = $pdo->prepare($SQL_INSERT_CATEGORIE);
        $stmt->execute([$description, $prixNuite]);

        return $stmt->rowCount()>0;
    }

    // Recuperer toutes les categories
    function getCategorie(PDO $pdo){

        $SQL_SELECT_CATEGORIE = "SELECT * FROM categorie";
        $stmt = $pdo->query($SQL_SELECT_CATEGORIE);
        $allCategorie = $stmt->fetchAll();

        return $allCategorie;
    }

     //Modifier une categorie
    function modifierCategorie(PDO $pdo, $description, $prixNuite, $id) {
    $SQL_UPDATE_CATEGORIE = "UPDATE categorie SET description = ?, prixNuite = ?  WHERE id=?";
    $stmt = $pdo->prepare($SQL_UPDATE_CATEGORIE);
    $stmt->execute([$description, $prixNuite, $id]);
    return $stmt->rowCount()>0;
    }

    // Supprimer categorie
    function supprimerCategorie(PDO $pdo, $id){
        $SQL_DELETE_CATEGORIE = "DELETE * FROM categorie WHERE id=?";
        $stmt= $pdo->prepare($SQL_DELETE_CATEGORIE);
        $stmt->execute([$id]);

        return $stmt->rowCount()>0;
    }