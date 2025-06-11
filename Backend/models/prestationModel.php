<?php
    //Creation pour lister les prestations par le client
    function ListerPrestation(PDO $pdo){
        $sql = "SELECT * FROM prestation";
        $stmt = $pdo->query($sql);
        $prestation = $stmt ->fetchAll();
        return $prestation;
    }

     function ListerPrestationId($pdo, $id){
        $sql = "SELECT * FROM prestation WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        if ($stmt->rowCount() == 0) {
            return null; // Aucune prestation trouvée
        }
        $stmt = $pdo->query($sql);
        $prestation = $stmt ->fetchAll();
        return $prestation;
    }
    
    // creation de la prestation
    function createPrestation(PDO $pdo, $prix,$description){
        $sql = "INSERT INTO prestation(prix,description) VALUES(?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt -> execute([$prix,$description]);
        return $stmt->rowCount()>0;
    }
 
    //Modifier une prestation
    function modifierPrestation(PDO $pdo,$id,$prix,$description){

        $sql = "UPDATE prestation SET prix = ?, description = ? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$prix, $description, $id]);
        if ($stmt->rowCount() == 0) {
            return false; // Aucune modification effectuée
        }

        return $stmt->rowCount()>0;
    }

    // Supprimer prestation
    function supprimerPrestation(PDO $pdo, $id){
        $sql = "DELETE FROM prestation WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->rowCount() > 0;
    }



