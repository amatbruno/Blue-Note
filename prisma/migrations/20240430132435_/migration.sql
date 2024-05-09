/*
  Warnings:

  - You are about to drop the column `singer_rol` on the `codigoactivacion` table. All the data in the column will be lost.
  - You are about to alter the column `height` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `codigoactivacion` DROP COLUMN `singer_rol`;

-- AlterTable
ALTER TABLE `user` MODIFY `height` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `events` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_title` VARCHAR(191) NOT NULL,
    `event_description` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `eventTime` VARCHAR(191) NOT NULL,
    `streetAddres` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contactForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proposal` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lineup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LineupUsers` (
    `eventId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `contactFormId` INTEGER NULL,

    PRIMARY KEY (`eventId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LineupUsers` ADD CONSTRAINT `LineupUsers_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineupUsers` ADD CONSTRAINT `LineupUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineupUsers` ADD CONSTRAINT `LineupUsers_contactFormId_fkey` FOREIGN KEY (`contactFormId`) REFERENCES `contactForm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
