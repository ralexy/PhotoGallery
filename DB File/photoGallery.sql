-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 01, 2020 at 12:05 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `photoGallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `authorId` int(11) NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthDate` date DEFAULT NULL,
  `deathDate` date DEFAULT NULL,
  `biography` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`authorId`, `firstName`, `lastName`, `birthDate`, `deathDate`, `biography`) VALUES
(1, 'Pablo', 'Picasso', '1881-10-25', '1973-04-08', 'Pablo Picasso (Pablo Ruiz Picasso, Picasso étant le nom de sa mère) est un artiste peintre et sculpteur né à Málaga en Espagne en 1881. Il a vécu en France jusqu\'à sa mort le 8 avril 1973.\r\n\r\nPablo Picasso est l\'un des peintres les plus importants du xxe siècle. Il a réalisé aux alentours de « 1 885 tableaux, 1 228 sculptures, 2 880 céramiques, 7 089 dessins, 342 tapisseries, 150 carnets de croquis et 30 000 estampes (gravures, lithographies, etc.) »1. Il est l\'un des plus célèbres artistes du xxe siècle et on dit généralement que son œuvre a changé le cours de l\'art moderne. Il est d\'ailleurs le premier à avoir exposé de son vivant au musée du Louvre à Paris. Il avait alors 91 ans.'),
(2, 'Léonard', 'De Vinci', '2020-03-01', '2020-03-01', 'Blablabla');

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `collectionId` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`collectionId`, `name`, `description`) VALUES
(1, 'picasso', 'Tableaux de Pablo Picasso'),
(2, 'de vinci', 'Tableaux de Léonard de Vinci');

-- --------------------------------------------------------

--
-- Table structure for table `picture`
--

CREATE TABLE `picture` (
  `pictureId` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sourceUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `artist` int(11) NOT NULL,
  `year` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `picture`
--

INSERT INTO `picture` (`pictureId`, `title`, `description`, `sourceUrl`, `artist`, `year`) VALUES
(1, 'Les demoiselles d\'Avignon\r\n', '', 'https://www.pablopicasso.org/avignon.jsp', 1, 1907),
(2, 'Guernica', '', 'https://www.pablopicasso.org/guernica.jsp', 1, 1937),
(3, 'Peintre & Modèle', '', 'https://www.pablopicasso.org/painter-and-model.jsp', 1, 1928),
(4, 'Portrait de tante Pepa', '', 'https://www.pablopicasso.org/portrait-of-aunt-pepa.jsp', 1, 1896),
(5, 'La Joconde', 'Tableau emblématique de Léonard de Vinci', '', 2, 1503);

-- --------------------------------------------------------

--
-- Table structure for table `picture_collection`
--

CREATE TABLE `picture_collection` (
  `pictureId` int(11) NOT NULL,
  `collectionId` int(11) NOT NULL,
  `orderShow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `picture_collection`
--

INSERT INTO `picture_collection` (`pictureId`, `collectionId`, `orderShow`) VALUES
(2, 1, 1),
(3, 1, 2),
(5, 2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`authorId`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`collectionId`);

--
-- Indexes for table `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`pictureId`),
  ADD KEY `fk_artist` (`artist`) USING BTREE;

--
-- Indexes for table `picture_collection`
--
ALTER TABLE `picture_collection`
  ADD PRIMARY KEY (`orderShow`,`pictureId`,`collectionId`) USING BTREE,
  ADD KEY `fk_idPicture` (`pictureId`),
  ADD KEY `fk_idCollection` (`collectionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `authorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `collectionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `picture`
--
ALTER TABLE `picture`
  MODIFY `pictureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `picture_collection`
--
ALTER TABLE `picture_collection`
  MODIFY `orderShow` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `picture`
--
ALTER TABLE `picture`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`artist`) REFERENCES `artist` (`authorId`);

--
-- Constraints for table `picture_collection`
--
ALTER TABLE `picture_collection`
  ADD CONSTRAINT `fk_idCollection` FOREIGN KEY (`collectionId`) REFERENCES `collection` (`collectionId`),
  ADD CONSTRAINT `fk_idPicture` FOREIGN KEY (`pictureId`) REFERENCES `picture` (`pictureId`);
