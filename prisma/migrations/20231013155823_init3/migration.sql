-- DropForeignKey
ALTER TABLE `apikeys` DROP FOREIGN KEY `ApiKeys_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `ApiKeys` ADD CONSTRAINT `ApiKeys_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
