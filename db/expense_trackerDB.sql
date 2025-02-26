CREATE DATABASE  IF NOT EXISTS `expense_tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `expense_tracker`;
-- MySQL dump 10.13  Distrib 8.0.41, for macos15 (arm64)
--
-- Host: localhost    Database: expense_tracker
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `category` varchar(30) NOT NULL,
  PRIMARY KEY (`id_category`),
  UNIQUE KEY `id_category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Grocery'),(2,'Pet'),(3,'Mortgage'),(4,'Entertainment'),(5,'Health'),(6,'Utilities'),(7,'Car'),(8,'Dining Out'),(9,'Shopping'),(10,'Travel'),(11,'Debt'),(12,'Childcare'),(13,'Tech'),(14,'Beauty');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id_expense` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `amount` float NOT NULL,
  `date` date DEFAULT NULL,
  `fk_category` int DEFAULT NULL,
  `fk_usuario` int NOT NULL,
  PRIMARY KEY (`id_expense`),
  UNIQUE KEY `id_expense` (`id_expense`),
  KEY `fk_category` (`fk_category`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`fk_category`) REFERENCES `categories` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (1,'dress for Noras wedding',120,'2025-01-15',9,2),(2,'New Phone',628,'2025-01-23',13,2),(3,'Gas',25,'2025-01-15',7,3),(4,'Cat Food',15.5,'2025-01-16',2,3),(5,'SPA',60,'2025-02-10',5,3),(6,'movie tickets',42.5,'2025-02-18',4,2),(8,'CC payment',66.35,'2025-02-02',11,3),(9,'Flight Tickets to Italy',199,'2025-02-07',10,2),(11,'Babysitter',80,'2025-02-10',12,2),(12,'Dental Cleaning',70,'2025-02-22',5,2),(13,'Haircut',40,'2025-02-25',14,2);
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_DB`
--

DROP TABLE IF EXISTS `usuarios_DB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_DB` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_DB`
--

LOCK TABLES `usuarios_DB` WRITE;
/*!40000 ALTER TABLE `usuarios_DB` DISABLE KEYS */;
INSERT INTO `usuarios_DB` VALUES (1,'maria@gmail.com','Maria','123'),(2,'elena@gmail.com','Elena','$2b$10$fyIvq3Ct789EVEEHRDyyHudQdKEZcONV7TLdC8A7yH32JeuVajfDO'),(3,'fabio@gmail.com','Fabio','$2b$10$2yUizaSoL4BW9P/QBfflJucGf70.1xkAWmS845wWFv6xFMsfE3xyO');
/*!40000 ALTER TABLE `usuarios_DB` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'expense_tracker'
--

--
-- Dumping routines for database 'expense_tracker'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-26 13:00:27
