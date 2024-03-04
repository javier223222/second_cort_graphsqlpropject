-- CreateTable
CREATE TABLE `WeebHook` (
    `idWeebHook` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `url` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idWeebHook`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeebHookSucriptionP` (
    `idWeebHookSucriptionP` INTEGER NOT NULL AUTO_INCREMENT,
    `idWeebHook` INTEGER NOT NULL,
    `topic` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idWeebHookSucriptionP`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WeebHook` ADD CONSTRAINT `WeebHook_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeebHookSucriptionP` ADD CONSTRAINT `WeebHookSucriptionP_idWeebHook_fkey` FOREIGN KEY (`idWeebHook`) REFERENCES `WeebHook`(`idWeebHook`) ON DELETE RESTRICT ON UPDATE CASCADE;
