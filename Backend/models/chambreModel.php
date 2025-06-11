<?php
    function genererNumeroChambreUnique(PDO $pdo, $prefixe = 'A'){
        // Validation du préfixe
        $prefixe = strtoupper($prefixe);
        if (!preg_match('/^[A-Z]$/', $prefixe)) {
            throw new InvalidArgumentException("Le préfixe doit être une lettre A-Z");
        } 

        $maxTentatives = 100;
        $numeroChambre = '';

        for ($i = 0; $i < $maxTentatives; $i++) {
            // Génération d'un numéro aléatoire sur 3 chiffres
            $numero = str_pad(mt_rand(1, 999), 3, '0', STR_PAD_LEFT);
            $numeroChambre = $prefixe . '-' . $numero;

            // Vérification en base de données
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM chambres WHERE numero = :numero");
            $stmt->execute([':numero' => $numeroChambre]);
            $existeDeja = (bool)$stmt->fetchColumn();

            if (!$existeDeja) {
                return $numeroChambre;
            }
        }

        throw new RuntimeException("Impossible de générer un numéro unique après $maxTentatives tentatives");
    }

    //Creation d'une chambre
    function createChambre(PDO $pdo,$numero_fixe, $description, $id_categorie_fk, $id_hotel_fk, $disponibilite=true){

        $num_chambre = genererNumeroChambreUnique($pdo);

        $SQL_INSERT_CHAMBRE = "INSERT INTO chambre (num_chambre, numero_fixe, description, id_categorie_fk, id_hotel_fk, disponibilite) VALUES(?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($SQL_INSERT_CHAMBRE);
        $stmt->execute([$num_chambre, $numero_fixe, $description, $id_categorie_fk, $id_hotel_fk, $disponibilite]);

        return $stmt->rowCount()>0;
    }

    // Recuperer toutes les chambres
    function getChambre(PDO $pdo){

        $SQL_SELECT_CHAMBRE = "SELECT * FROM chambre INNER JOIN categorie c ON c.id = chambre.id_categorie_fk";
        $stmt = $pdo->query($SQL_SELECT_CHAMBRE);
        $allChambres = $stmt->fetchAll();

        return $allChambres;
    }

    //Recuperer Chambre dispo
    function getChambreDispo(PDO $pdo, $dispo){
        $SQL_SELECT_CHAMBRE = "SELECT * FROM chambre INNER JOIN categorie c ON c.id = chambre.id_categorie_fk where status=?";
        
        $stmt = $pdo->prepare($SQL_SELECT_CHAMBRE);
        $stmt->execute([$dispo]);
        $allChambres = $stmt->fetchAll();
        

        return $allChambres;
    }
    

    //Modifier une chambre
    function modifierChambre(PDO $pdo, $idChambre,$numero_fixe, $description, $id_categorie_fk, $id_hotel_fk, $disponibilite){

        $SQL_UPDATE_CHAMBRE = "UPDATE chambre SET numero_fixe = ?, description = ?, id_categorie_fk= ?, id_hotel_fk= ?, status = ? WHERE id=?";
        $stmt = $pdo->prepare($SQL_UPDATE_CHAMBRE);
        $stmt->execute([$numero_fixe, $description, $id_categorie_fk, $id_hotel_fk, $disponibilite, $idChambre]);

        return $stmt->rowCount()>0;
    }

    // Supprimer chambre
    function supprimerChambre(PDO $pdo, $idChambre){
        $SQL_DELETE_CHAMBRE = "DELETE * FROM chambre WHERE id=?";
        $stmt= $pdo->prepare($SQL_DELETE_CHAMBRE);
        $stmt->execute([$idChambre]);

        return $stmt->rowCount()>0;
    }

    //changer la categorie d'une chambre
    function changeCategorie(PDO $pdo, $idChambre, $id_categorie_fk){

        $SQL_UPDATE_CATEGORIEfk = "UPDATE chambre SET id_categorie_fk = ? where id= ?";
        $stmt = $pdo->prepare($SQL_UPDATE_CATEGORIEfk);
        $stmt->execute([$id_categorie_fk, $idChambre]);

        return $stmt->rowCount();
    }

    //MAJ disponibilité
    function setDisponibilite(PDO $pdo, $idChambre, $disponibilite){

        $SQL_UPDATE_DISPONIBILITE = "UPDATE chambre SET disponibilite = ? WHERE id = ?";
        $stmt= $pdo->prepare($SQL_UPDATE_DISPONIBILITE);
        $stmt->execute([$disponibilite, $idChambre]);

        return $stmt->rowCount();
    }