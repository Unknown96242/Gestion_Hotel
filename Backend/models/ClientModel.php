<?php    
    //Ajouter un client
    function ajouterClient($nom, $prenom, $age, $login, $mot_de_passe){
        global $pdo;
        $sql = "INSERT INTO client (nom, prenom, age, login, mot_de_passe) VALUES (?,?,?,?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt ->execute([
            ':nom' => $nom,
            ':prenom' => $prenom,
            ':age' => $age,
            ':login' => $login,
            ':mot_de_passe' => password_hash($mot_de_passe, PASSWORD_DEFAULT)
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

    // Récupérer tous les clients
    function getAllClients() {
        global $pdo;
        $sql = "SELECT * FROM client";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

