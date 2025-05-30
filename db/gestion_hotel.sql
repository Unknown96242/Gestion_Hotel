-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 29 mai 2025 à 19:44
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_hotel`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `prix_nuité` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `description`, `prix_nuité`) VALUES
(1, 'Chambre Simple', 50000),
(2, 'Chambre Double', 80000),
(3, 'Suite Junior', 120000),
(4, 'Suite Luxe', 250000),
(5, 'Chambre Familiale', 100000);

-- --------------------------------------------------------

--
-- Structure de la table `chambre`
--

CREATE TABLE `chambre` (
  `id` int(11) NOT NULL,
  `num_chambre` varchar(100) NOT NULL,
  `numero_fixe` varchar(15) NOT NULL,
  `description` text NOT NULL,
  `id_categorie_fk` int(11) NOT NULL,
  `id_hotel_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chambre`
--

INSERT INTO `chambre` (`id`, `num_chambre`, `numero_fixe`, `description`, `id_categorie_fk`, `id_hotel_fk`) VALUES
(1, '101', '0123456789', 'Chambre simple avec vue sur jardin', 1, 1),
(2, '102', '0123456790', 'Chambre double, balcon', 2, 1),
(3, '201', '0123456791', 'Suite junior, étage élevé', 3, 1),
(4, '202', '0123456792', 'Chambre familiale, deux lits doubles', 5, 1),
(5, '301', '0123456793', 'Suite luxe, terrasse privée', 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id`, `nom`, `prenom`, `age`, `login`, `mot_de_passe`) VALUES
(1, 'jonh', 'doe', 69, 'unknown', '12345678'),
(2, 'Martin', 'Sophie', 28, 'smartin', 'motdepasse1'),
(3, 'Guay', 'Mamadou', 45, 'mamdou25', 'passw0rd'),
(4, 'Diallo', 'Aminata', 36, 'adiallo', 'aminata2024'),
(5, 'Smith', 'John', 40, 'jsmith', 'johnsmith');

-- --------------------------------------------------------

--
-- Structure de la table `gestionnaire`
--

CREATE TABLE `gestionnaire` (
  `id_gestionnaire` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `age` int(3) NOT NULL,
  `login` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `nom_hotel` varchar(50) NOT NULL,
  `nombres_chambres` int(11) NOT NULL,
  `pays` varchar(50) NOT NULL,
  `addresse` varchar(100) NOT NULL,
  `image_hotel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hotel`
--

INSERT INTO `hotel` (`id`, `nom_hotel`, `nombres_chambres`, `pays`, `addresse`, `image_hotel`) VALUES
(1, 'Hôtel du Parc', 50, 'Senegal', '12 rue Mamadou sy, 75001 Dakar', 'hotel_parc.jpg'),
(2, 'Sunset Resort', 120, 'Espagne', 'Avenida del Mar, 08002 Barcelone', 'sunset_resort.jpg'),
(3, 'Royal Palace', 80, 'Maroc', 'Boulevard Hassan II, Casablanca', 'royal_palace.jpg'),
(4, 'Alpine Lodge', 30, 'Suisse', 'Chemin des Neiges, 1200 Genève', 'alpine_lodge.jpg'),
(5, 'Blue Lagoon', 60, 'Grèce', 'Plage de Mykonos, 84600 Mykonos', 'blue_lagoon.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `prestation`
--

CREATE TABLE `prestation` (
  `id` int(11) NOT NULL,
  `prix` double NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `prestation`
--

INSERT INTO `prestation` (`id`, `prix`, `description`) VALUES
(1, 2000, 'Petit-déjeuner continental'),
(2, 3500, 'Dîner gastronomique'),
(3, 1500, 'Accès spa'),
(4, 1000, 'Parking sécurisé'),
(5, 2500, 'Service de blanchisserie');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `id_client_fk` int(11) NOT NULL,
  `status` enum('en attente','valider','annuler','archiver') NOT NULL,
  `mode_paiement` enum('espece','carte bancaire','cheque','') NOT NULL,
  `date_limite` date NOT NULL,
  `date_deb` date NOT NULL,
  `date_fin` date NOT NULL,
  `cout_total` double NOT NULL,
  `id_chambre_fk` int(11) NOT NULL,
  `id_prestation_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `id_client_fk`, `status`, `mode_paiement`, `date_limite`, `date_deb`, `date_fin`, `cout_total`, `id_chambre_fk`, `id_prestation_fk`) VALUES
(1, 1, 'en attente', 'carte bancaire', '2025-06-10', '2025-07-01', '2025-07-05', 350, 2, 1),
(2, 2, 'valider', 'espece', '2025-06-15', '2025-08-10', '2025-08-15', 500, 3, 2),
(3, 3, 'annuler', 'cheque', '2025-06-20', '2025-09-01', '2025-09-03', 180, 1, NULL),
(4, 1, 'valider', 'carte bancaire', '2025-06-12', '2025-07-10', '2025-07-12', 220, 4, 3),
(5, 4, 'archiver', 'espece', '2025-06-18', '2025-07-20', '2025-07-25', 600, 2, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `chambre`
--
ALTER TABLE `chambre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk-categorie-chambre` (`id_categorie_fk`),
  ADD KEY `fk-hotel-chambre` (`id_hotel_fk`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `gestionnaire`
--
ALTER TABLE `gestionnaire`
  ADD PRIMARY KEY (`id_gestionnaire`);

--
-- Index pour la table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `prestation`
--
ALTER TABLE `prestation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk-client-reservation` (`id_client_fk`),
  ADD KEY `fk-prestation-reservation` (`id_prestation_fk`),
  ADD KEY `fk-chambre-reservation` (`id_chambre_fk`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `chambre`
--
ALTER TABLE `chambre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `gestionnaire`
--
ALTER TABLE `gestionnaire`
  MODIFY `id_gestionnaire` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `prestation`
--
ALTER TABLE `prestation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chambre`
--
ALTER TABLE `chambre`
  ADD CONSTRAINT `fk-categorie-chambre` FOREIGN KEY (`id_categorie_fk`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `fk-hotel-chambre` FOREIGN KEY (`id_hotel_fk`) REFERENCES `hotel` (`id`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk-chambre-reservation` FOREIGN KEY (`id_chambre_fk`) REFERENCES `chambre` (`id`),
  ADD CONSTRAINT `fk-client-reservation` FOREIGN KEY (`id_client_fk`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `fk-prestation-reservation` FOREIGN KEY (`id_prestation_fk`) REFERENCES `prestation` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
