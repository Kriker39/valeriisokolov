-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 25 2020 г., 16:53
-- Версия сервера: 5.7.28
-- Версия PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `valeriisokolov_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `login` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `admin`
--

INSERT INTO `admin` (`id`, `login`, `password`) VALUES
(1, 'Kriker39', '$2y$10$/WV6DgklWVAHyCIJoDj0feqyJBp9Yuh2J1aKWHciCMxsjVM7LFTpW');

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `comment_ru` text,
  `comment_en` text,
  `comment_ua` text,
  `comment` tinyint(1) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `link` (`link`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `name`, `link`, `github`, `comment_ru`, `comment_en`, `comment_ua`, `comment`) VALUES
(1, 'valeriisokolov.ua', 'http://valeriisokolov.ua', 'https://github.com/Kriker39/valeriisokolov.ua', 'Мой личный сайт чтобы показать работы которые сделал я или в которых брал участие.', 'My personal site to show the work that I have done or in which I took part.', 'Мій особистий сайт щоб показати роботи які зробив я або в яких брав участь.', NULL),
(2, 'calculator', 'http://valeriisokolov.ua/projects/calculator', 'https://github.com/Kriker39/calculator', 'Calculator создавался во время изучения jQuery. Цель создания проекта была в том чтобы улучшить навыки владения html, js(jQuery, Ajax), php.', NULL, NULL, NULL),
(69, 'test01.com', NULL, NULL, '', '', '', NULL),
(70, 'test02.com', NULL, NULL, '', '', '', NULL),
(71, 'test03.com', NULL, NULL, '', NULL, NULL, NULL),
(72, 'test04.com', NULL, NULL, '', NULL, NULL, NULL),
(73, 'test05.com', NULL, NULL, '', NULL, NULL, NULL),
(74, 'test06.com', NULL, NULL, '', NULL, NULL, NULL),
(75, 'test07.com', NULL, NULL, '', NULL, NULL, NULL),
(76, 'test08.com', NULL, NULL, '', NULL, NULL, NULL),
(77, 'test09.com', NULL, NULL, 'русский ru', 'endlish en', 'українська ua', NULL),
(79, 'test123', 'asd', 'asd', NULL, NULL, NULL, NULL),
(80, 'test1234', 'asdasd', 'asd', 'rus', 'eng', 'ua', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
