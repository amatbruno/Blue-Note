-- CreateTable
CREATE TABLE `codigoActivacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activationCode` VARCHAR(191) NOT NULL,
    `type` ENUM('ADMIN', 'DIRECTOR', 'SINGER', 'TEMP') NOT NULL,
    `singer_rol` ENUM('SOPRANO', 'ALTO', 'TENOR', 'BAJO') NULL,
    `usesLeft` INTEGER NOT NULL,

    UNIQUE INDEX `codigoActivacion_activationCode_key`(`activationCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `type` ENUM('ADMIN', 'DIRECTOR', 'SINGER', 'TEMP') NOT NULL,
    `rope` ENUM('SOPRANO', 'ALTO', 'TENOR', 'BAJO') NULL,
    `color` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `photo` LONGBLOB NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
