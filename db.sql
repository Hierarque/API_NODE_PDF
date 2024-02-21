CREATE TABLE `generated_docs` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` blob NOT NULL,
  `creation_date` date DEFAULT (now())
);

CREATE TABLE `characters` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `race` varchar(255) NOT NULL,
  `background` varchar(255) NOT NULL,
  `strength` int NOT NULL,
  `dexterity` int NOT NULL,
  `intelligence` int NOT NULL,
  `wisdom` int NOT NULL,
  `charisma` int NOT NULL
);
