-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 23 juil. 2023 à 19:56
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `airneis`
--

-- --------------------------------------------------------

--
-- Structure de la table `carousel`
--

DROP TABLE IF EXISTS `carousel`;
CREATE TABLE IF NOT EXISTS `carousel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `carousel`
--

INSERT INTO `carousel` (`id`, `image`, `date`) VALUES
(4, 'image', '2023-05-22 22:06:20'),
(2, 'image', '2023-05-22 22:07:08'),
(7, 'image', '2023-05-22 22:14:54');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_categorie`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom`, `date`) VALUES
(1, 'Armoire', '2023-05-18 15:46:55'),
(2, 'Bureau', '2023-05-18 15:46:55'),
(3, 'Canapé', '2023-05-18 15:46:55'),
(4, 'Chaise', '2023-05-18 15:46:55'),
(5, 'Fauteuil', '2023-05-18 15:46:55'),
(6, 'Lit', '2023-05-18 15:46:55'),
(7, 'Table', '2023-05-22 18:47:06');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_compte` int NOT NULL,
  `nom_adresse_livraison` varchar(255) NOT NULL,
  `nom_livraison` varchar(255) NOT NULL,
  `prenom_livraison` varchar(255) NOT NULL,
  `adresse_livraison` varchar(255) NOT NULL,
  `adresse_livraison2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `code_postal_livraison` int NOT NULL,
  `ville_livraison` varchar(255) NOT NULL,
  `pays_livraison` varchar(255) NOT NULL,
  `nom_facturation` varchar(255) NOT NULL,
  `prenom_facturation` varchar(255) NOT NULL,
  `adresse_facturation` varchar(255) NOT NULL,
  `code_postal_facturation` varchar(255) NOT NULL,
  `ville_facturation` varchar(255) NOT NULL,
  `pays_facturation` varchar(255) NOT NULL,
  `nom_paiement` varchar(255) NOT NULL,
  `numero_paiement` varchar(255) NOT NULL,
  `date_paiement` varchar(255) NOT NULL,
  `cvv_paiement` varchar(255) NOT NULL,
  `total_produit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `total_panier` float NOT NULL,
  `etat` varchar(255) NOT NULL DEFAULT 'En cours de préparation',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `id_compte`, `nom_adresse_livraison`, `nom_livraison`, `prenom_livraison`, `adresse_livraison`, `adresse_livraison2`, `code_postal_livraison`, `ville_livraison`, `pays_livraison`, `nom_facturation`, `prenom_facturation`, `adresse_facturation`, `code_postal_facturation`, `ville_facturation`, `pays_facturation`, `nom_paiement`, `numero_paiement`, `date_paiement`, `cvv_paiement`, `total_produit`, `total_panier`, `etat`, `date`) VALUES
(94, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:04'),
(93, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:04'),
(92, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:04'),
(91, 15, 'Ecole', 'Raunier', 'Damien', '88 Bd Gallieni', '', 92130, 'Issy-les-Moulineaux', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 188.98, 'Expédiée', '2023-07-12 15:58:43'),
(90, 15, 'Ecole', 'Raunier', 'Damien', '88 Bd Gallieni', '', 92130, 'Issy-les-Moulineaux', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '2', 318.96, 'En cours de préparation', '2023-07-12 15:57:50'),
(84, 26, 'Bureau', 'RINGLER', 'zd', '5 allée du Parc', 'az', 94370, 'Sucy-En-Brie', 'az', 'FEFEF', 'EFZEFZE', 'EZFZEFZE', '88888', 'ZEZER', 'EZREZR', 'RINGLER Baptiste', '4444444444444444', '226', '885', '10', 2121.84, 'Annulé', '2023-07-12 13:13:45'),
(85, 15, 'Ecole', 'Raunier', 'Damien', '88 Bd Gallieni', '', 92130, 'Issy-les-Moulineaux', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '5', 886, 'Annulé', '2023-07-12 13:30:27'),
(86, 15, 'Ecole', 'Raunier', 'Damien', '88 Bd Gallieni', '', 92130, 'Issy-les-Moulineaux', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '2', 60, 'Annulé', '2023-07-12 13:40:47'),
(87, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'ringker', '1111111111111111', '1111', '111', '9', 8991, 'Expédiée', '2023-07-12 14:17:40'),
(88, 26, 'Bureau', 'RINGLER', 'zd', '5 allée du Parc', 'az', 94370, 'Sucy-En-Brie', 'az', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '183', 50089.6, 'Annulé', '2023-07-12 14:31:54'),
(89, 26, 'Bureau', 'RINGLER', 'zd', '5 allée du Parc', 'az', 94370, 'Sucy-En-Brie', 'az', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '183', 50089.6, 'Annulé', '2023-07-12 14:31:54'),
(83, 26, 'Bureau', 'RINGLER', 'zd', '5 allée du Parc', 'az', 94370, 'Sucy-En-Brie', 'az', 'FEFEF', 'EFZEFZE', 'EZFZEFZE', '88888', 'ZEZER', 'EZREZR', 'RINGLER Baptiste', '4444444444444444', '226', '885', '10', 9990, 'Annulé', '2023-07-12 11:55:07'),
(82, 26, 'Bureau', 'RINGLER', 'zd', '5 allée du Parc', 'az', 94370, 'Sucy-En-Brie', 'az', 'FEFEF', 'EFZEFZE', 'EZFZEFZE', '88888', 'ZEZER', 'EZREZR', 'RINGLER Baptiste', '4444444444444444', '226', '885', '1', 999, 'Annulé', '2023-07-12 11:53:31'),
(81, 26, 'Bureau', 'RINGLER', 'zd', '5 allée du Parc', 'az', 94370, 'Sucy-En-Brie', 'az', 'FEFEF', 'EFZEFZE', 'EZFZEFZE', '88888', 'ZEZER', 'EZREZR', 'RINGLER Baptiste', '4444444444444444', '226', '885', '3', 165, 'Annulé', '2023-07-12 11:50:55'),
(95, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:05'),
(96, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:05'),
(97, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:05'),
(98, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:06'),
(99, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:06'),
(100, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:06'),
(101, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:07'),
(102, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '51', 15699, 'Annulé', '2023-07-13 09:35:07'),
(103, 26, 'Maison Vacance', 'Ringler', 'Victorien', '5 allée du Parc', '', 94370, 'Sucy-En-Brie', 'FRANCE', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '1', 999, 'Annulé', '2023-07-13 09:40:47'),
(104, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:40:49'),
(105, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:40:52'),
(106, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:41:09'),
(107, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:41:09'),
(108, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:41:09'),
(109, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:41:09'),
(110, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:41:09'),
(111, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:41:10'),
(112, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:41:10'),
(113, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 09:41:10'),
(114, 26, 'Bureau', 'RINGLER', 'zd', '5 allée du Parc', 'az', 94370, 'Sucy-En-Brie', 'az', 'RINGLER', 'BAPTISTE', '69 Avenue de la Paix', '94260', 'Fresnes', 'FRANCE', 'RINGLER Baptiste', '4444444444444444', '21 54', '885', '1', 999, 'En cours de préparation', '2023-07-13 09:47:56'),
(115, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 11:34:37'),
(116, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 11:35:32'),
(117, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412346813', '04/24', '123', '1', 999, 'Annulé', '2023-07-13 11:35:43'),
(118, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 55, 'Annulé', '2023-07-14 22:48:32'),
(119, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-14 22:50:08'),
(120, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-14 22:54:55'),
(121, 15, 'Maison', 'Raunier ', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-14 22:58:28'),
(122, 14, 'zdazd', 'azdazd', 'zdazdaza', 'dazdazda', 'zdazdazd', 9500, 'azdazd', 'france', 'dzadz', 'azdazd', 'azdazda', '0', 'azdazda', 'zdazd', 'dza', 'dza', '0', '0', '1', 250, 'Annulé', '2023-07-18 22:28:10'),
(123, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Expédiée', '2023-07-19 22:53:17'),
(124, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 09:07:52'),
(125, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:05:43'),
(126, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:12:55'),
(127, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:13:17'),
(128, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:13:35'),
(129, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:14:22'),
(130, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:16:13'),
(131, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:17:03'),
(132, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:20:34'),
(133, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:25:01'),
(134, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 19:28:04'),
(135, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 20:55:23'),
(136, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 20:56:09'),
(137, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:21:20'),
(138, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:23:06'),
(139, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:24:05'),
(140, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:25:00'),
(141, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:26:14'),
(142, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:28:08'),
(143, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:28:55'),
(144, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:32:19'),
(145, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:33:09'),
(146, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:35:20'),
(147, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 21:41:19'),
(148, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-20 22:01:30'),
(149, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '2', 1000, 'Annulé', '2023-07-20 22:18:40'),
(150, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 199.99, 'Annulé', '2023-07-20 22:43:56'),
(151, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-21 10:17:39'),
(152, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 139, 'Annulé', '2023-07-21 11:59:58'),
(153, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-21 19:43:46'),
(154, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-21 20:04:21'),
(155, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-21 20:05:25'),
(156, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-21 20:07:28'),
(157, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-21 20:09:10'),
(158, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '3', 914.94, 'Annulé', '2023-07-21 21:50:22'),
(159, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 139, 'Annulé', '2023-07-21 22:10:45'),
(160, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-21 22:10:47'),
(161, 15, 'Maison', 'Raunier', 'Damien', '31 rue des Bourguignons', '', 91230, 'Montgeron', 'France', 'Raunier', 'Damien', '31 rue des Bourguignons', '91230', 'Montgeron', 'France', 'Raunier Damien', '1234123412341234', '2025-07', '124', '1', 500, 'Annulé', '2023-07-21 23:34:16');

-- --------------------------------------------------------

--
-- Structure de la table `commande_produit`
--

DROP TABLE IF EXISTS `commande_produit`;
CREATE TABLE IF NOT EXISTS `commande_produit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_commande` int NOT NULL,
  `id_produit` int NOT NULL,
  `nom_produit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `prix_produit` float NOT NULL,
  `quantite_produit` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande_produit`
--

INSERT INTO `commande_produit` (`id`, `id_commande`, `id_produit`, `nom_produit`, `prix_produit`, `quantite_produit`) VALUES
(42, 61, 3, 'Chaise verte', 999, 1),
(41, 61, 2, 'Chaise marron ', 500, 1),
(40, 60, 26, 'Lit blanc - Tête de lit en bois', 319.99, 1),
(39, 60, 3, 'Chaise verte', 999, 3),
(38, 59, 25, 'Lit en bois', 159.99, 1),
(37, 59, 21, 'Fauteuil gris', 189.99, 1),
(36, 59, 20, 'Fauteuil en cuir', 179.98, 1),
(35, 59, 16, 'Petite table en bois', 119.99, 1),
(34, 58, 10, 'Chaise Violette (2)', 55, 1),
(33, 58, 5, 'Chaise violette', 192, 1),
(32, 57, 2, 'Chaise marron ', 500, 1),
(31, 56, 15, 'Table en bois foncé', 159.99, 1),
(30, 56, 2, 'Chaise marron ', 500, 1),
(29, 55, 3, 'Chaise verte', 999, 1),
(28, 55, 2, 'Chaise marron ', 500, 1),
(27, 54, 3, 'Chaise verte', 999, 1),
(26, 53, 6, 'Chaise Blanche', 192, 1),
(25, 53, 4, 'Chaise grise (2)', 139, 1),
(43, 62, 19, 'Bureau blanc', 139.98, 1),
(44, 62, 20, 'Fauteuil en cuir', 179.98, 1),
(45, 63, 21, 'Fauteuil gris', 189.99, 1),
(46, 63, 23, 'Lit', 289.99, 1),
(47, 64, 2, 'Chaise marron ', 500, 1),
(48, 64, 3, 'Chaise verte', 999, 1),
(49, 65, 2, 'Chaise marron ', 500, 1),
(50, 66, 2, 'Chaise marron ', 500, 4),
(51, 67, 3, 'Chaise verte', 999, 4),
(52, 68, 2, 'Chaise marron ', 500, 2),
(53, 68, 3, 'Chaise verte', 999, 1),
(54, 68, 6, 'Chaise Blanche', 192, 1),
(55, 69, 3, 'Chaise verte', 999, 1),
(56, 70, 9, 'Fauteuil Design', 110, 1),
(57, 70, 20, 'Fauteuil en cuir', 179.98, 1),
(58, 70, 26, 'Lit blanc - Tête de lit en bois', 319.99, 1),
(59, 71, 39, 'Canapé rouge', 188.98, 1),
(60, 71, 58, 'Chaise velour', 120, 3),
(61, 72, 3, 'Chaise verte', 999, 1),
(62, 73, 2, 'Chaise marron ', 500, 1),
(63, 73, 3, 'Chaise verte', 999, 2),
(64, 74, 3, 'Chaise verte', 999, 1),
(65, 75, 3, 'Chaise verte', 999, 1),
(66, 76, 2, 'Chaise marron ', 500, 9),
(67, 76, 3, 'Chaise verte', 999, 9),
(68, 77, 3, 'Chaise verte', 999, 1),
(69, 78, 18, 'Bureau en bois clair', 139.98, 2),
(70, 78, 19, 'Bureau blanc', 139.98, 2),
(71, 78, 24, 'Lit une place', 159.99, 2),
(72, 78, 26, 'Lit blanc - Tête de lit en bois', 319.99, 1),
(73, 79, 4, 'Chaise grise (2)', 139, 4),
(74, 79, 33, 'Canapé bleu', 299.99, 2),
(75, 79, 36, 'Canapé rouge', 251.99, 2),
(76, 79, 39, 'Canapé rouge', 188.98, 1),
(77, 80, 2, 'Chaise marron ', 500, 1),
(78, 80, 5, 'Chaise violette', 192, 3),
(79, 81, 10, 'Chaise Violette (2)', 55, 3),
(80, 82, 3, 'Chaise verte', 999, 1),
(81, 83, 3, 'Chaise verte', 999, 10),
(82, 84, 36, 'Canapé rouge', 251.99, 4),
(83, 84, 37, 'Canapé jaune', 178.98, 2),
(84, 84, 38, 'Canapé blanc', 188.98, 4),
(85, 85, 4, 'Chaise grise (2)', 139, 1),
(86, 85, 6, 'Chaise Blanche', 192, 1),
(87, 85, 7, 'Chaise Blanche (2)', 250, 2),
(88, 85, 10, 'Chaise Violette (2)', 55, 1),
(89, 86, 83, 'test de produit', 30, 2),
(90, 87, 3, 'Chaise verte', 999, 9),
(91, 88, 2, 'Chaise marron ', 500, 20),
(92, 88, 3, 'Chaise verte', 999, 1),
(93, 88, 4, 'Chaise grise (2)', 139, 20),
(94, 88, 5, 'Chaise violette', 192, 7),
(95, 88, 6, 'Chaise Blanche', 192, 10),
(96, 88, 7, 'Chaise Blanche (2)', 250, 10),
(97, 88, 8, 'Chaise Blanche (3)', 490, 10),
(98, 88, 9, 'Fauteuil Design', 110, 4),
(99, 88, 10, 'Chaise Violette (2)', 55, 10),
(100, 88, 13, 'Table en bois clair', 159.99, 4),
(101, 88, 14, 'Table en bois', 159.99, 4),
(102, 88, 15, 'Table en bois foncé', 159.99, 4),
(103, 88, 16, 'Petite table en bois', 119.99, 4),
(104, 88, 17, 'Bureau en bois', 139.98, 4),
(105, 88, 18, 'Bureau en bois clair', 139.98, 2),
(106, 88, 19, 'Bureau blanc', 139.98, 2),
(107, 88, 20, 'Fauteuil en cuir', 179.98, 1),
(108, 88, 21, 'Fauteuil gris', 189.99, 2),
(109, 88, 23, 'Lit', 289.99, 2),
(110, 88, 24, 'Lit une place', 159.99, 1),
(111, 88, 25, 'Lit en bois', 159.99, 2),
(112, 88, 26, 'Lit blanc - Tête de lit en bois', 319.99, 1),
(113, 88, 27, 'Lit enfant', 99.99, 5),
(114, 88, 28, 'Armoire blanche', 199.99, 5),
(115, 88, 29, 'Armoire blanche liseré or', 199.99, 2),
(116, 88, 30, 'Armoire en bois', 299.99, 2),
(117, 88, 31, 'Armoire en bois foncé', 299.99, 3),
(118, 88, 32, 'Armoire grise', 299.99, 5),
(119, 88, 33, 'Canapé bleu', 299.99, 4),
(120, 88, 34, 'Canapé rose', 299.99, 2),
(121, 88, 35, 'Canapé gris', 251.99, 3),
(122, 88, 36, 'Canapé rouge', 251.99, 4),
(123, 88, 37, 'Canapé jaune', 178.98, 2),
(124, 88, 38, 'Canapé blanc', 188.98, 4),
(125, 88, 57, 'Fauteuil en cuir ', 877.95, 10),
(126, 88, 58, 'Chaise velour', 120, 7),
(127, 89, 2, 'Chaise marron ', 500, 20),
(128, 89, 3, 'Chaise verte', 999, 1),
(129, 89, 4, 'Chaise grise (2)', 139, 20),
(130, 89, 5, 'Chaise violette', 192, 7),
(131, 89, 6, 'Chaise Blanche', 192, 10),
(132, 89, 7, 'Chaise Blanche (2)', 250, 10),
(133, 89, 8, 'Chaise Blanche (3)', 490, 10),
(134, 89, 9, 'Fauteuil Design', 110, 4),
(135, 89, 10, 'Chaise Violette (2)', 55, 10),
(136, 89, 13, 'Table en bois clair', 159.99, 4),
(137, 89, 14, 'Table en bois', 159.99, 4),
(138, 89, 15, 'Table en bois foncé', 159.99, 4),
(139, 89, 16, 'Petite table en bois', 119.99, 4),
(140, 89, 17, 'Bureau en bois', 139.98, 4),
(141, 89, 18, 'Bureau en bois clair', 139.98, 2),
(142, 89, 19, 'Bureau blanc', 139.98, 2),
(143, 89, 20, 'Fauteuil en cuir', 179.98, 1),
(144, 89, 21, 'Fauteuil gris', 189.99, 2),
(145, 89, 23, 'Lit', 289.99, 2),
(146, 89, 24, 'Lit une place', 159.99, 1),
(147, 89, 25, 'Lit en bois', 159.99, 2),
(148, 89, 26, 'Lit blanc - Tête de lit en bois', 319.99, 1),
(149, 89, 27, 'Lit enfant', 99.99, 5),
(150, 89, 28, 'Armoire blanche', 199.99, 5),
(151, 89, 29, 'Armoire blanche liseré or', 199.99, 2),
(152, 89, 30, 'Armoire en bois', 299.99, 2),
(153, 89, 31, 'Armoire en bois foncé', 299.99, 3),
(154, 89, 32, 'Armoire grise', 299.99, 5),
(155, 89, 33, 'Canapé bleu', 299.99, 4),
(156, 89, 34, 'Canapé rose', 299.99, 2),
(157, 89, 35, 'Canapé gris', 251.99, 3),
(158, 89, 36, 'Canapé rouge', 251.99, 4),
(159, 89, 37, 'Canapé jaune', 178.98, 2),
(160, 89, 38, 'Canapé blanc', 188.98, 4),
(161, 89, 57, 'Fauteuil en cuir ', 877.95, 10),
(162, 89, 58, 'Chaise velour', 120, 7),
(163, 90, 18, 'Bureau en bois clair', 139.98, 1),
(164, 90, 37, 'Canapé jaune', 178.98, 1),
(165, 91, 38, 'Canapé blanc', 188.98, 1),
(166, 92, 2, 'Chaise marron ', 500, 20),
(167, 92, 3, 'Chaise verte', 999, 1),
(168, 92, 4, 'Chaise grise (2)', 139, 20),
(169, 92, 6, 'Chaise Blanche', 192, 10),
(170, 103, 3, 'Chaise verte', 999, 1),
(171, 113, 3, 'Chaise verte', 999, 1),
(172, 114, 3, 'Chaise verte', 999, 1),
(173, 118, 10, 'Chaise Violette (2)', 55, 1),
(174, 119, 2, 'Chaise marron ', 500, 1),
(175, 120, 2, 'Chaise marron ', 500, 1),
(176, 121, 2, 'Chaise marron ', 500, 1),
(177, 122, 7, 'Chaise Blanche (2)', 250, 1),
(178, 123, 2, 'Chaise marron ', 500, 1),
(179, 124, 2, 'Chaise marron ', 500, 1),
(180, 125, 2, 'Chaise marron ', 500, 1),
(181, 126, 2, 'Chaise marron ', 500, 1),
(182, 127, 2, 'Chaise marron ', 500, 1),
(183, 128, 2, 'Chaise marron ', 500, 1),
(184, 129, 2, 'Chaise marron ', 500, 1),
(185, 130, 2, 'Chaise marron ', 500, 1),
(186, 131, 2, 'Chaise marron ', 500, 1),
(187, 132, 2, 'Chaise marron ', 500, 1),
(188, 133, 2, 'Chaise marron ', 500, 1),
(189, 134, 2, 'Chaise marron ', 500, 1),
(190, 135, 2, 'Chaise marron ', 500, 1),
(191, 136, 2, 'Chaise marron ', 500, 1),
(192, 137, 2, 'Chaise marron ', 500, 1),
(193, 138, 2, 'Chaise marron ', 500, 1),
(194, 139, 2, 'Chaise marron ', 500, 1),
(195, 140, 2, 'Chaise marron ', 500, 1),
(196, 141, 2, 'Chaise marron ', 500, 1),
(197, 142, 2, 'Chaise marron ', 500, 1),
(198, 143, 2, 'Chaise marron ', 500, 1),
(199, 144, 2, 'Chaise marron ', 500, 1),
(200, 145, 2, 'Chaise marron ', 500, 1),
(201, 146, 2, 'Chaise marron ', 500, 1),
(202, 147, 2, 'Chaise marron ', 500, 1),
(203, 148, 2, 'Chaise marron ', 500, 1),
(204, 149, 2, 'Chaise marron ', 500, 2),
(205, 150, 28, 'Armoire blanche', 199.99, 1),
(206, 151, 2, 'Chaise marron ', 500, 1),
(207, 152, 4, 'Chaise grise (2)', 139, 1),
(208, 153, 2, 'Chaise marron ', 500, 1),
(209, 154, 2, 'Chaise marron ', 500, 1),
(210, 155, 2, 'Chaise marron ', 500, 1),
(211, 156, 2, 'Chaise marron ', 500, 1),
(212, 157, 2, 'Chaise marron ', 500, 1),
(213, 158, 2, 'Chaise marron ', 500, 1),
(214, 158, 21, 'Fauteuil gris', 189.99, 1),
(215, 158, 86, 'Armoire en bois', 224.95, 1),
(216, 159, 4, 'Chaise grise (2)', 139, 1),
(217, 160, 2, 'Chaise marron ', 500, 1),
(218, 161, 2, 'Chaise marron ', 500, 1);

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `nom`, `email`, `message`, `date`) VALUES
(146, 'Hugo', 'Hugo@hugo.com', 'Bonjour, ou est mon canape !!!!\n', '2023-07-12 12:44:38'),
(148, 'Raunier ', 'damienraunier@gmail.com', 'Mon meuble n\'est plus en stock ☹️', '2023-07-21 12:07:46'),
(144, 'Ronaldo', 'ronaldo@ronaldo.com', 'Je veux un canapé en forme de ballon de foot', '2023-07-09 11:05:01'),
(142, 'test', 'test@test.com', 'test', '2023-06-24 00:44:09');

-- --------------------------------------------------------

--
-- Structure de la table `espace_administrateur`
--

DROP TABLE IF EXISTS `espace_administrateur`;
CREATE TABLE IF NOT EXISTS `espace_administrateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `espace_administrateur`
--

INSERT INTO `espace_administrateur` (`id`, `nom`, `password`, `date`) VALUES
(1, 'admin', '$2y$10$F8C6MqRqHsMGF/kRXD0ZQepvAkNChH7diS4Vhb9nazltwrfs8vU.e', '2023-05-22 10:59:13');

-- --------------------------------------------------------

--
-- Structure de la table `espace_membres`
--

DROP TABLE IF EXISTS `espace_membres`;
CREATE TABLE IF NOT EXISTS `espace_membres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nom_facturation` varchar(255) NOT NULL,
  `prenom_facturation` varchar(255) NOT NULL,
  `pays_facturation` varchar(255) NOT NULL,
  `adresse_facturation` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `code_postal_facturation` int DEFAULT NULL,
  `ville_facturation` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `reset` tinyint(1) NOT NULL DEFAULT '0',
  `reset_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `espace_membres`
--

INSERT INTO `espace_membres` (`id`, `nom`, `email`, `password`, `date`, `nom_facturation`, `prenom_facturation`, `pays_facturation`, `adresse_facturation`, `code_postal_facturation`, `ville_facturation`, `reset`, `reset_time`) VALUES
(9, 'hugo', 'hugo.b_pereira@outlook.com', '$2y$10$1fw2T.qYMvoySwz.BT3QWeF0UVD0NC2UmVWD7yd6kv/YgGWn1Ed7W', '2023-04-07 15:30:05', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(11, 'admin', 'admin@admin.com', '$2y$10$KwQGCQhik29VfnTiGVnzuOQGxiuOwMobwxcjZDMHRezube3tzdkOu', '2023-04-11 14:11:42', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(12, 'staff', 'staff@staff.com', '$2y$10$8U3/E3EjNPP2cYUm/6ihHuPVviPk6e8FpCTzkUIbITFblSZSy5MmC', '2023-04-11 15:12:57', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(13, 'Baptiste', 'staff@staffBaptiste.com', '$2y$10$ta2oxPkMN5gPMc3kOCJRQuc.ROUB/VHmEYeI9FE1VU6op66zzluta', '2023-04-11 15:15:38', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(14, 'Damien', 'dada@dada.com', '$2y$10$YNRmTnxEPITDY90RiuViq.Qnu1yT6wGdJQnPV5V2vSAOTOlg0HSPC', '2023-04-11 15:16:18', 'dzadz', 'azdazd', 'zdazd', 'azdazda', 0, 'azdazda', 0, '0000-00-00 00:00:00'),
(15, 'Raunier', 'damienraunier@gmail.com', '$2y$10$U8xEnwxT9d1ASzTg9ZI9A.kj6SVNYrMncRd9W8gZN99EiZ1Tdz9PW', '2023-04-11 16:31:04', 'Raunier', 'Damien', 'France', '31 rue des Bourguignons', 91230, 'Montgeron', 0, '0000-00-00 00:00:00'),
(16, 'Debiane', 'baefhdfkhrzk@beakb.com', '$2y$10$4KzyZeMJjuiDts.WG.gbJu.XdIvEJjqg4zTEVvQmVQVLyMSTaCcQK', '2023-04-14 02:51:18', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(17, 'Fantik', 'bonjour@yo.fr', '$2y$10$Y29ujxbWjRgicZSXQrNcLOP15XV/kae9haJXn3E7YqHmeDxlismeW', '2023-05-02 09:19:23', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(18, 'Raunier', 'd.raunier@h3hitema.fr', '$2y$10$27NwwLWGFe44Q2oPeecDru0GB8Gxm3fONtmEzs4vJRpmw.CvVpiWW', '2023-05-11 11:24:18', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(19, 'Etignard', 'MORAMOUD@paul.com', '$2y$10$c4lHcZF.zLDhUg2Bpz4KleV5vo/4VPp8EHKJEs9ivCMRj.OLfyeVa', '2023-05-13 19:16:18', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(21, 'sdfg', 'alo@alo.fr', '$2y$10$eOkpXC0N8UVHCta91RrkO.TmaSiI1rIr8epTK7IjOLWl1PF.GbZnu', '2023-05-16 18:43:01', 'RINGLER', 'Baptiste', 'FRANCEertg', '5 allée du Parc', 94370, 'Sucy-En-Brie', 0, '0000-00-00 00:00:00'),
(22, 'aezrazera', 'e@e.fr', '$2y$10$7Q2LNFFhAz8CIXMpfbmljeKCe1cmH4A6IxTLVDAgIwkM8wpIZ6Yhm', '2023-05-20 15:38:42', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(24, 'z', 'z@z.fr', '$2y$10$joFdcuRiHBrzg/mMhEEc7.ZLRAXNFs2gPV3LdZG8iaY899clzNW1e', '2023-05-22 15:46:39', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(25, 'bg', 'test@test.com', '$2y$10$Kr/p4dVWPx5niWnpaFi0M.v.NT/tpLldg93sU80CoZSB4Cef7sV1C', '2023-05-24 14:09:33', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(26, 'romain', 'romain@romain.fr', '$2y$10$Iqxby00ig6WVtncbXbRmXef6sV1RP9sXYsr03hKi/PvmIgMnax50S', '2023-05-25 14:11:29', 'RINGLER', 'BAPTISTE', 'FRANCE', '69 Avenue de la Paix', 94260, 'Fresnes', 0, '0000-00-00 00:00:00'),
(29, 'Hugo', 'hugobpereira55@gmail.com', '$2y$10$y4xRz.SEbj2q9JqwxDKjv.85C9gw2TJ8TDegmNRFEYt/7NrBLEoJy', '2023-06-02 14:46:33', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(30, 'Jorge', 'jorgedeco13@hotmail.fr', '$2y$10$0GX6AARW.lPIsKYHOQl8bOwKSd6/lun6OkXbFtAezsxDvxQi5Mw2q', '2023-06-02 15:04:08', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(31, 'toto', 'toto@hotmail.com', '$2y$10$p1OzaKPJMdPt/LxQICTDfu6/voYzkGODwmgbM0vYGNmydmuciAnV.', '2023-06-02 15:24:40', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(32, 'tata', 'tata@hotmail.com', '$2y$10$AHKeDwI4oABwzlRH0ggCPe951p75R1hqZYAiTLMqXlrv.SYqNKYf2', '2023-06-02 15:30:19', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(33, 'enfaite', 'enfaite@hotmail.com', '$2y$10$lPUDnIhvnKVC.r5hVA9qCe/bQmqKe2bTa/ZznsZoqsqTmReuqRBLW', '2023-06-02 15:48:00', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(34, 'Barbosa', 'barbosa@hotmail.com', '$2y$10$1x1FM6lFI0OUNiwKPaIHKOWHj1bTERKShnHzre1q2IzMvxk4ALXVy', '2023-06-02 15:56:30', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(35, 'compte de test', 'az@az.fr', '$2y$10$WcR85F05vKzQQ1reqEmxseooHVeIm9rPQqWS2cNwJnj/z/thbi7/e', '2023-06-29 11:39:53', '', '', 'FRANCE', '69 Avenue de la Paix', 94260, 'Fresnes', 0, '0000-00-00 00:00:00'),
(36, 'testadresse@test.fr', 'testadresse@test.fr', '$2y$10$SDcgfkIGKDM8.R7WNuDUcevYo5eTrKjR6G9dOcvYsXqiyVG5ElEem', '2023-06-30 11:18:35', 'RINGLER', 'Baptiste', 'FRANCE', '5 allée du Parc', 94370, 'Sucy-En-Brie', 0, '0000-00-00 00:00:00'),
(37, 'test3000', 'test@compte.com', '$2y$10$1g.eeHDmmqQ775YfZ5mFsO1yNNYE4P9So1kR1v4bfNi0PuGwNk2pO', '2023-06-30 11:29:25', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(38, 'dalo', 'damien@oui.fr', '$2y$10$DyNT6Y0/4fSmfxIwExyym.6chsCP8jFQPQqwW98ud.x.HJwq6q206', '2023-07-11 12:59:04', 'RINGLER', 'Baptiste', 'FRANCE', '5 allée du Parc', 94370, 'Sucy-En-Brie', 0, '0000-00-00 00:00:00'),
(39, 'test2093298', 'test@test3.com', '$2y$10$xCU2./XPe136/E8jkoemZe3EPOCQkahyx5HKwiI/rOkYbyHVZW2p2', '2023-07-12 10:10:10', '', '', '', '', NULL, '', 0, '0000-00-00 00:00:00'),
(40, 'hugo', 'hugo@hugo.com', '$2y$10$c.T4pVk5VqFFAjf9aJp/mOWcR3qXhJjPJjTcm0d8O2kDzYb9COaDy', '2023-07-12 11:38:08', '', '', '', '', NULL, '', 1, '2023-07-21 11:46:20'),
(42, 'RINGLER', 'ringlerbaptiste@gmail.com', '$2y$10$00F1DATV9B2f9vLT1N0xIOz1BhZLFZo.df8rf7eNdYkClAxyIhHYu', '2023-07-18 19:46:07', '', '', '', '', NULL, '', 1, '2023-07-21 12:17:25');

-- --------------------------------------------------------

--
-- Structure de la table `livraison`
--

DROP TABLE IF EXISTS `livraison`;
CREATE TABLE IF NOT EXISTS `livraison` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_compte` int NOT NULL,
  `nom_adresse` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `adresse1` varchar(255) NOT NULL,
  `adresse2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ville` varchar(255) NOT NULL,
  `code_postal` int NOT NULL,
  `pays` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `livraison`
--

INSERT INTO `livraison` (`id`, `id_compte`, `nom_adresse`, `prenom`, `nom`, `adresse1`, `adresse2`, `ville`, `code_postal`, `pays`) VALUES
(42, 38, 'chez dalo', 'dalo', 'dalo', 'sucy en brie de merde', '', 'Sucy-En-Brie', 94370, 'FRANCE'),
(2, 26, 'Bureau', 'zd', 'RINGLER', '5 allée du Parc', 'az', 'Sucy-En-Brie', 94370, 'az'),
(5, 26, 'Maison Vacance', 'Victorien', 'Ringler', '5 allée du Parc', '', 'Sucy-En-Brie', 94370, 'FRANCE'),
(38, 14, 'zdazd', 'zdazdaza', 'azdazd', 'dazdazda', 'zdazdazd', 'azdazd', 9500, 'france'),
(4, 36, 'REZEZDZD', 'RINZFDZF', 'RINGLER', '5 allée du Parc', 'zee', 'Sucy-En-Brie', 94370, 'paris'),
(40, 21, '5 allée du Parc', 'zer', 'RINGLER', 'zer', 'ezr', 'Sucy-En-Brie', 55555, 'erzzer'),
(43, 15, 'Maison', 'Damien', 'Raunier', '31 rue des Bourguignons', '', 'Montgeron', 91230, 'France'),
(30, 26, 'Maison Hugo', 'Hugo', 'BARBOSA', '1 RUE DE CAMILLE', '', 'CAMILLELAND', 94400, 'FRANCE');

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

DROP TABLE IF EXISTS `paiement`;
CREATE TABLE IF NOT EXISTS `paiement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_compte` int NOT NULL,
  `nom` varchar(255) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `cvv` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `paiement`
--

INSERT INTO `paiement` (`id`, `id_compte`, `nom`, `numero`, `date`, `cvv`) VALUES
(4, 14, 'dza', 'dza', '0', 0),
(5, 26, 'RINGLER Baptiste', '4444444444444444', '21 54', 885),
(6, 15, 'Raunier Damien', '1234123412341234', '2025-07', 124),
(7, 26, 'TEST DAMIEN', '5555 6666 4444 8888', '11', 789),
(8, 21, 'rrrr', '0000 00000 0000 0000', '2020', 222),
(9, 38, 'dalo', '1234 4152 7482 5262', '10', 123),
(10, 26, 'ringker', '1111111111111111', '1111', 111),
(22, 40, 'Mr Hugo Barbosa', '123456', '01/23', 111),
(15, 15, 'Raunier Aline', '1234123412345601', '19/21', 123),
(43, 15, 'test', '1234', '1234', 123);

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `prix` float NOT NULL,
  `featured` bit(1) NOT NULL,
  `categorie` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stock` int NOT NULL DEFAULT '0',
  `materiau` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `description`, `prix`, `featured`, `categorie`, `date`, `stock`, `materiau`) VALUES
(1, 'Chaise grise', 'Une chaise grise venu d\'ailleurs pour vous offrir un confort sans pareil.', 299.99, b'0', 4, '2023-05-04 11:06:54', 0, 'bois'),
(2, 'Chaise marron ', 'Chaise marron de très haute qualité', 500, b'0', 4, '2023-05-04 12:30:09', 19, 'bois'),
(3, 'Chaise verte', 'Chaise Verte de très très très haute qualité', 999, b'1', 4, '2023-05-04 12:31:26', 1, 'aluminium'),
(4, 'Chaise grise (2)', 'C\'est une Chaise... qui est grise...', 139, b'0', 4, '2023-05-04 12:56:50', 20, 'bois'),
(6, 'Chaise Blanche', 'Bah une chaise blanche', 192, b'0', 4, '2023-05-04 12:57:44', 10, 'acier'),
(7, 'Chaise Blanche (2)', 'Chaise de dingue ', 250, b'0', 4, '2023-05-04 18:08:40', 10, 'bois'),
(8, 'Chaise Blanche (3)', 'Chaise trop bien', 490, b'0', 4, '2023-05-04 18:08:52', 10, 'acier'),
(10, 'Chaise Violette (2)', 'Une chaise violette...', 55, b'1', 4, '2023-05-04 18:09:21', 10, 'acier'),
(5, 'Chaise violette', 'Une chaise violette', 192, b'0', 4, '2023-05-04 12:57:44', 7, 'acier'),
(9, 'Fauteuil Design', 'Un fauteuil au design atypique', 110, b'0', 5, '2023-05-04 18:09:21', 4, 'plastique'),
(13, 'Table en bois clair', 'Une table en bois clair', 159.99, b'0', 7, '2023-05-04 18:09:21', 4, 'bois'),
(14, 'Table en bois', 'Une table en bois', 159.99, b'0', 7, '2023-05-04 18:09:21', 4, 'bois'),
(15, 'Table en bois foncé', 'Une table en bois foncé', 159.99, b'0', 7, '2023-05-04 18:09:21', 4, 'bois'),
(16, 'Petite table en bois', 'Une petite table en bois clair', 119.99, b'0', 7, '2023-05-04 18:09:21', 4, 'bois'),
(17, 'Bureau en bois', 'Un bureau en bois foncé', 139.98, b'0', 2, '2023-05-04 18:09:21', 4, 'bois'),
(18, 'Bureau en bois clair', 'Un bureau en bois clair', 139.98, b'0', 2, '2023-05-04 18:09:21', 1, 'bois'),
(19, 'Bureau blanc', 'Un bureau blanc', 139.98, b'0', 2, '2023-05-04 18:09:21', 2, 'plastique'),
(20, 'Fauteuil en cuir', 'Un fauteuil en cuir', 179.98, b'0', 5, '2023-05-04 18:09:21', 1, 'acier'),
(21, 'Fauteuil gris', 'Un fauteuil de couleur gris', 189.99, b'1', 5, '2023-05-04 18:09:21', 2, 'bois'),
(22, 'Fauteuil rouge', 'Un fauteuil de couleur rouge', 189.99, b'0', 5, '2023-05-04 18:09:21', 0, 'bois'),
(23, 'Lit', 'Un lit assez banale', 289.99, b'0', 6, '2023-05-04 18:09:21', 2, 'bois'),
(24, 'Lit une place', 'Un lit une place', 159.99, b'0', 6, '2023-05-04 18:09:21', 1, 'bois'),
(25, 'Lit en bois', 'Un lit double en bois', 159.99, b'0', 6, '2023-05-04 18:09:21', 2, 'bois'),
(26, 'Lit blanc - Tête de lit en bois', 'Un lit double blanc avec tête de lit en bois', 319.99, b'0', 6, '2023-05-04 18:09:21', 1, 'bois'),
(27, 'Lit enfant', 'Un lit une place enfant', 99.99, b'0', 6, '2023-05-04 18:09:21', 5, 'plastique'),
(28, 'Armoire blanche', 'Une armoire blanche', 199.99, b'0', 1, '2023-05-04 18:09:21', 5, 'bois'),
(29, 'Armoire blanche liseré or', 'Une armoire blanche double porte avec des liseré or', 199.99, b'0', 1, '2023-05-04 18:09:21', 2, 'bois'),
(30, 'Armoire en bois', 'Une armoire en bois', 299.99, b'0', 1, '2023-05-04 18:09:21', 2, 'bois'),
(31, 'Armoire en bois foncé', 'Une armoire en bois foncé', 299.99, b'0', 1, '2023-05-04 18:09:21', 3, 'bois'),
(32, 'Armoire grise', 'Une armoire grise', 299.99, b'0', 1, '2023-05-04 18:09:21', 5, 'acier'),
(33, 'Canapé bleu', 'Un canapé bleu', 299.99, b'0', 3, '2023-05-04 18:09:21', 4, 'bois'),
(34, 'Canapé rose', 'Un canapé rose', 299.99, b'0', 3, '2023-05-04 18:09:21', 2, 'bois'),
(35, 'Canapé gris', 'Un canapé gris', 251.99, b'0', 3, '2023-05-04 18:09:21', 3, 'bois'),
(36, 'Canapé rouge', 'Un canapé rouge', 251.99, b'0', 3, '2023-05-04 18:09:21', 4, 'aluminium'),
(37, 'Canapé jaune', 'Un canapé jaune', 178.98, b'0', 3, '2023-05-04 18:09:21', 1, 'aluminium'),
(38, 'Canapé blanc', 'Un canapé blanc', 188.98, b'0', 3, '2023-05-04 18:09:21', 3, 'aluminium'),
(39, 'Canapé rouge', 'Un canapé rouge', 188.98, b'0', 3, '2023-05-04 18:09:21', 0, 'bois'),
(58, 'Chaise velour', 'La chaise en velours est vraiment notre coup de cœur ! Assise large, design sobre et finitions au top : elle a tout pour plaire !', 120, b'0', 4, '2023-06-09 20:54:28', 7, 'bois'),
(57, 'Fauteuil en cuir', 'Un fauteuil en cuir de taureau malien extrêmement luxueux et confortable', 877.95, b'0', 5, '2023-06-05 16:06:36', 10, 'bois'),
(84, 'Armoire en bois', 'une armoire en bois', 119, b'0', 1, '2023-07-19 21:32:31', 3, 'bois'),
(85, 'Table en verre', 'C\'est une table en verre', 425.99, b'0', 7, '2023-07-19 22:13:08', 3, 'verre'),
(86, 'Armoire en bois', 'Une armoire en bois verte!!!', 224.95, b'0', 1, '2023-07-20 12:26:58', 5, 'bois');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
