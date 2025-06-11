<?php    
    //Ajouter un client
    function ajouterClient($nom, $prenom, $age, $login, $mot_de_passe){
        global $pdo;
        $sql = "INSERT INTO client (nom, prenom, age, login, mot_de_passe) VALUES (?,?,?,?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt ->execute([
            $nom,
            $prenom,
            $age,
            $login,
            password_hash($mot_de_passe, PASSWORD_DEFAULT)
        ]);
        return $pdo ->lastInsertId();
    }

    //Modifier un client
    function modifierClient($id, $nom, $prenom, $age, $login, $mot_de_passe){
        global $pdo;
        $sql= "UPDATE client SET nom = :nom, prenom = :prenom, age = :age, login = :login, mot_de_passe = :mot_de_passe WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nom' => $nom,
            ':prenom' => $prenom,
            ':age' => $age,
            ':login' => $login,
            ':mot_de_passe' => password_hash($mot_de_passe, PASSWORD_DEFAULT),
            $id,
        ]);
        return $stmt->rowCount();
    }

//Supprimer un Client
    function supprimerClient($id){
        global $pdo;
        $sql = "DELETE FROM client WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->rowCount();
    }
//Recupérer les informations d'un client
    function getClient($id){
        global $pdo;
        $sql = "SELECT * FROM client WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    //Demande de reservation
    function reserver($id_client_fk, $status = 'valider', $mode_paiement, $date_limite, $date_deb, $date_fin, $cout_total, $id_chambre_fk, $selected_prestation){
        global $pdo;

        $SQL_INSERT_RESERVATION = "INSERT INTO reservation (id_client_fk, status, mode_paiement, date_limite, date_deb, date_fin, cout_total, id_chambre_fk)";
        $stmt= $pdo->prepare($SQL_INSERT_RESERVATION);

        $stmt->execute([
            $id_client_fk,
            $status,
            $mode_paiement,
            $date_limite,
            $date_deb,
            $date_fin,
            $cout_total,
            $id_chambre_fk
        ]);

        $lastInsertId = $pdo->lastInsertId();

        foreach($selected_prestation as $p){
            $SQL_INSERT_PRESTATION_OF_RESERVATION = "INSERT INTO reservation_prestation (id_reservation_fk, id_prestation_fk) VALUES (?, ?)";
            $stmt2 = $pdo->prepare($SQL_INSERT_PRESTATION_OF_RESERVATION);
            $stmt2->execute([$lastInsertId, $p]);
        }

    }

    function getReservations($id_client){
        global $pdo;

        $SQL_SELECT_RESERVATIONS_OF_CLIENT = "SELECT * FROM reservation WHERE id_client_fk = ?";
        $stmt = $pdo->prepare($SQL_SELECT_RESERVATIONS_OF_CLIENT);
        $stmt->execute([$id_client]);

        return $stmt->fetchAll();
    }
<<<<<<< HEAD
=======
    // vous m'avez fait losse j'ai chercher la fonction la portout c'est a 03h11 que je viens de trouver
>>>>>>> 3c1ac75cf64495d1bc3b91015e319a4f76e903d7
    function getAllClients() {
        global $pdo;
        $sql = "SELECT * FROM client";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

