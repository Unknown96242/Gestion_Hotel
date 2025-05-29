<?php
    $host = 'localhost';
    $dbname = 'gestion_hotel';
    $user = 'root';
    $pass = '';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    } catch (PDOException $e) {
        die("Erreur de connexion : " . $e->getMessage());
    }

?>