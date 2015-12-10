-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 08 Décembre 2015 à 14:23
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `dbblog`
--
CREATE DATABASE IF NOT EXISTS `dbblog` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dbblog`;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE IF NOT EXISTS `categorie` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` text NOT NULL,
  `LienB` text NOT NULL,
  `Ordre` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Contenu de la table `categorie`
--

INSERT INTO `categorie` (`Id`, `Nom`, `LienB`, `Ordre`) VALUES
(23, 'Fanart', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/banniere/banniere%20fanart2.jpg', 2),
(24, 'Original', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/banniere/banniere%20original2.jpg', 1),
(25, 'Daily Life', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/banniere/banniere%20daily%20life.jpg', 0),
(26, 'Sketch', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/banniere/banniere%20sketch.jpg', 3);

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdCateg` int(11) NOT NULL,
  `ProjName` text NOT NULL,
  `Descr` text NOT NULL,
  `LienMin` text NOT NULL,
  `LienBig` text NOT NULL,
  `Ordre` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Contenu de la table `images`
--

INSERT INTO `images` (`Id`, `IdCateg`, `ProjName`, `Descr`, `LienMin`, `LienBig`, `Ordre`) VALUES
(1, 23, 'A little light', 'Deuxième exercice d''éclairage! Avec Kairi, personnage du jeu vidéo "Kingdom Hearts"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_12.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_12.jpg', 2),
(2, 24, 'Winter', '', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_07.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_07.jpg', 2),
(3, 23, 'Chibi Serah', 'Serah Farron du jeu vidéo "Final Fantasy XIII-2" dans un style chibi', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_14.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_14.jpg', 9),
(4, 23, 'Connected Hearts', 'Sora et Kairi du jeu vidéo "Kingdom Hearts"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_15.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_15.jpg', 8),
(5, 23, 'Sunset', 'Cette illustration était un exercice d''éclairage (ici un couché de soleil) avec Xion, personnage du jeu vidéo "Kingdom Hearts 358/2 Days"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_13.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_13.jpg', 3),
(6, 23, 'Kingdom Hearts', 'Une illustration qui résume le jeu vidéo Kingdom Hearts.', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_17.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_17.jpg', 4),
(7, 23, 'Autumn', 'Un personnage de "Final Fantasy XII" portant une tenue décontractée', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_16.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_16.jpg', 7),
(8, 23, 'Hesitation', 'Stella: ancienne personnage du jeu "Final Fantasy XV"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_19.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_19.jpg', 6),
(9, 23, 'Bloom', '', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_20.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_20.jpg', 5),
(10, 23, ' Yuna''s Wedding', 'Yuna portant sa robe de mariée dans le jeu vidéo "Final Fantasy X"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/mins_21.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_21.jpg', 1),
(11, 24, 'Thinking', '', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_08.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_08.jpg', 4),
(12, 24, 'Summer Time', '', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_09.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_09.jpg', 0),
(13, 24, 'Orange', '', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_11.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_11.jpg', 3),
(14, 24, 'Deep Sea', '', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_10.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_10.jpg', 1),
(15, 23, 'Fighter', 'Tifa Lockhart du jeu vidéo "Final Fantasy VII" (prête à combattre!)', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/mins_24.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_24.jpg', 0),
(16, 26, 'Amalia', 'Fanart du personnage d''Amalia provenant du dessin animé "WAKFU"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_01.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_01.jpg', 5),
(17, 26, 'Chibi Yuna', '', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_05.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_05.jpg', 4),
(18, 26, 'Lee Hi - Rose', 'Fanart de la chanteuse Lee Hi dans son clip "Rose"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_06.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_06.jpg', 3),
(19, 26, 'Dara', 'Fanart de la chanteuse Dara dans son clip "Falling In Love"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_04.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_04.jpg', 2),
(20, 26, 'Lee Hi - It''s Over', 'Fanart de la chanteuse Lee Hi dans son clip "It''s Over"', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_03.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_03.jpg', 1),
(21, 26, 'Magician', '', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/min_02.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_02.jpg', 0),
(22, 25, 'Cheveux bouclés', 'C''est une relation d''amour et de haine entre moi et mes cheveux.', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/mins_22.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_22.jpg', 1),
(23, 25, 'Prenez mon argent!', 'Malheureusement l''argent ne traverse pas l''écran...', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20min/mins_23.jpg', 'http://i867.photobucket.com/albums/ab240/ptitelyli974/website/galerie%20big/big_23.jpg', 0);

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Titre` text NOT NULL,
  `Dat` text NOT NULL,
  `Contenus` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `news`
--

INSERT INTO `news` (`Id`, `Titre`, `Dat`, `Contenus`) VALUES
(0, 'george de la patate chaude', '2015-12-01 15:53:20', '<h1><span style="background-color: #ffff00;">un petit test.</span></h1>\n<p><span style="background-color: #ff0000;"><strong>ici nous tenton de cr&eacute;&eacute; une news.</strong></span></p>\n<p>avec des smiley <span style="text-decoration: underline;"><img src="js/tinymce/plugins/emoticons/img/smiley-cool.gif" alt="cool" /> <img src="js/tinymce/plugins/emoticons/img/smiley-money-mouth.gif" alt="money-mouth" /> <img src="js/tinymce/plugins/emoticons/img/smiley-kiss.gif" alt="kiss" /></span></p>\n<p><span style="background-color: #ccffff;">et ine i<span style="background-color: #ffff00;">mag</span>e centr&eacute;e</span></p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://ffgirl974blog.fr/v2/images/banniere.jpg" alt="fftest" width="441" height="169" /></p>'),
(15, 'testing1', '2015-12-04 08:14:47', '<p>Test fonctions</p>\n<h3><strong>Grand!</strong></h3>\n<p><strong><img src="http://ffgirl974blog.fr/images/banniere_1.jpg" alt="" width="540" height="193" /></strong></p>');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
