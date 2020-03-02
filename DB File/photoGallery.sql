-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 02, 2020 at 01:27 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `photoGallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `picturecollection`
--

CREATE TABLE `picturecollection` (
  `pictureId` int(11) NOT NULL,
  `collectionId` int(11) NOT NULL,
  `orderShow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `picturecollection`
--

INSERT INTO `picturecollection` (`pictureId`, `collectionId`, `orderShow`) VALUES
(2, 1, 1),
(3, 1, 2),
(5, 2, 3),
(12, 1, 12),
(12, 1, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `picturecollection`
--
ALTER TABLE `picturecollection`
  ADD PRIMARY KEY (`orderShow`,`pictureId`,`collectionId`) USING BTREE,
  ADD KEY `fk_idPicture` (`pictureId`),
  ADD KEY `fk_idCollection` (`collectionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `picturecollection`
--
ALTER TABLE `picturecollection`
  MODIFY `orderShow` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `picturecollection`
--
ALTER TABLE `picturecollection`
  ADD CONSTRAINT `fk_idCollection` FOREIGN KEY (`collectionId`) REFERENCES `collection` (`collectionId`),
  ADD CONSTRAINT `fk_idPicture` FOREIGN KEY (`pictureId`) REFERENCES `picture` (`pictureId`);
