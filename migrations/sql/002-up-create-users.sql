CREATE TABLE IF NOT EXISTS `users` (

    `id`            INT(10)         NOT NULL AUTO_INCREMENT
  , `name`          VARCHAR(255)    CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL    DEFAULT ''
  , `username`      VARCHAR(32)     CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL UNIQUE
  , `email`         VARCHAR(255)    NOT NULL    UNIQUE
  , `password`          VARCHAR(40) NOT NULL    DEFAULT ''
  , `is_admin`      TINYINT(1)      NOT NULL    DEFAULT 0
  , `created`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  , `status`        VARCHAR(16)     NOT NULL    DEFAULT 1
  , PRIMARY KEY (`id`)

) ENGINE=InnoDB