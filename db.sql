CREATE TABLE `tutorials` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255),
  `published` boolean DEFAULT false
);
