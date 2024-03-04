/*
  Warnings:

  - You are about to drop the column `topic` on the `weebhooksucriptionp` table. All the data in the column will be lost.
  - Added the required column `idTypeEvent` to the `WeebHookSucriptionP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `weebhooksucriptionp` DROP COLUMN `topic`,
    ADD COLUMN `idTypeEvent` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `typeEvent` (
    `idTypeEvent` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `typeEvent_name_key`(`name`),
    PRIMARY KEY (`idTypeEvent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WeebHookSucriptionP` ADD CONSTRAINT `WeebHookSucriptionP_idTypeEvent_fkey` FOREIGN KEY (`idTypeEvent`) REFERENCES `typeEvent`(`idTypeEvent`) ON DELETE RESTRICT ON UPDATE CASCADE;
