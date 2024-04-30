/*
  Warnings:

  - The primary key for the `lineupusers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `lineupId` to the `LineupUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lineupusers` DROP PRIMARY KEY,
    ADD COLUMN `lineupId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`eventId`, `userId`, `lineupId`);

-- CreateTable
CREATE TABLE `Assists` (
    `eventId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`eventId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LineupUsers` ADD CONSTRAINT `LineupUsers_lineupId_fkey` FOREIGN KEY (`lineupId`) REFERENCES `lineup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assists` ADD CONSTRAINT `Assists_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assists` ADD CONSTRAINT `Assists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
