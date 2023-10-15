/*
  Warnings:

  - You are about to drop the column `authorId` on the `apikeys` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `apikeys` table. All the data in the column will be lost.
  - Added the required column `name` to the `ApiKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `ApiKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `ApiKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `apikeys` DROP FOREIGN KEY `ApiKeys_authorId_fkey`;

-- AlterTable
ALTER TABLE `apikeys` DROP COLUMN `authorId`,
    DROP COLUMN `key`,
    ADD COLUMN `expire` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownerId` INTEGER NOT NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ApiKeys` ADD CONSTRAINT `ApiKeys_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
