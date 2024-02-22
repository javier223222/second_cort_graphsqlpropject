-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(70) NOT NULL,
    `gmail` VARCHAR(100) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_gmail_key`(`gmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `public_id` VARCHAR(150) NOT NULL,
    `url_public` VARCHAR(150) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Director` (
    `idDirector` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idDirector`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DirectorOfImage` (
    `idDirectorImg` INTEGER NOT NULL AUTO_INCREMENT,
    `urlImage` VARCHAR(200) NOT NULL,
    `public_id` VARCHAR(200) NOT NULL,
    `idDirector` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idDirectorImg`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actor` (
    `idActor` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idActor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageOfActor` (
    `idActorImg` INTEGER NOT NULL AUTO_INCREMENT,
    `urlImage` VARCHAR(200) NOT NULL,
    `public_id` VARCHAR(200) NOT NULL,
    `idActor` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idActorImg`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Studios` (
    `idStudio` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`idStudio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieStudios` (
    `idMovieStudio` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idStudio` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idMovieStudio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lengauge` (
    `idLenguageTalked` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Lengauge_name_key`(`name`),
    PRIMARY KEY (`idLenguageTalked`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlternantiveTittles` (
    `idAlternantiveTittle` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `AlternantiveTittles_name_key`(`name`),
    PRIMARY KEY (`idAlternantiveTittle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieAlternantiveTittle` (
    `idMovieAlternantiveTittle` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idAlternantiveTittle` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idMovieAlternantiveTittle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Countries` (
    `idCountry` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Countries_name_key`(`name`),
    PRIMARY KEY (`idCountry`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Releases` (
    `idreleases` INTEGER NOT NULL AUTO_INCREMENT,
    `idCountry` INTEGER NOT NULL,
    `idMovie` INTEGER NOT NULL,
    `dateOfRealeses` DATETIME(3) NOT NULL,
    `place` VARCHAR(200) NOT NULL,
    `clasification` VARCHAR(6) NOT NULL,
    `type` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idreleases`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genero` (
    `idGenero` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Genero_name_key`(`name`),
    PRIMARY KEY (`idGenero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Temas` (
    `idTema` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Temas_name_key`(`name`),
    PRIMARY KEY (`idTema`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ThemOfMovie` (
    `idThemOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `idTema` INTEGER NOT NULL,
    `idMovie` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idThemOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GeneroOfMovie` (
    `idGeneroOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idGenero` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idGeneroOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `idMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `year` DATETIME(3) NOT NULL,
    `slogan` VARCHAR(100) NULL,
    `description` VARCHAR(300) NOT NULL,
    `duration` INTEGER NOT NULL,

    PRIMARY KEY (`idMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LenguageOfMovie` (
    `idLenguageOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idLenguage` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idLenguageOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnotherLenguageOfMovie` (
    `idAnotherLenguageOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idLenguage` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idAnotherLenguageOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CountryOfMovieWh` (
    `idCountryOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idCountry` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idCountryOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DirectorsOfMovies` (
    `idDirectorOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `idDirector` INTEGER NOT NULL,
    `idMovie` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idDirectorOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cast` (
    `idCast` INTEGER NOT NULL AUTO_INCREMENT,
    `idActor` INTEGER NOT NULL,
    `idMovie` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idCast`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageOfMovie` (
    `idImageOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `urlImage` VARCHAR(200) NOT NULL,
    `public_id` VARCHAR(200) NOT NULL,
    `typeOfImage` VARCHAR(100) NOT NULL,
    `idMovie` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idImageOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CrewOfPeople` (
    `idCrewOfPeople` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idCrewOfPeople`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crewOfMovie` (
    `idcrewOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `idCrewOfPeople` INTEGER NOT NULL,
    `idMovie` INTEGER NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idcrewOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reseniaOfMovie` (
    `idReseniaOfMovie` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `resenia` VARCHAR(300) NOT NULL,
    `starts` DOUBLE NOT NULL,
    `wached_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `containsSpoilers` BOOLEAN NOT NULL,

    PRIMARY KEY (`idReseniaOfMovie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `idTag` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `idReseniaOfMovie` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    PRIMARY KEY (`idTag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `liked` (
    `idLiked` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idLiked`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `whoWached` (
    `idWhoWached` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idWhoWached`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `whereWatch` (
    `idWhereWatch` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `link` VARCHAR(200) NOT NULL,
    `imageservice` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idWhereWatch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `watchList` (
    `idWatchList` INTEGER NOT NULL AUTO_INCREMENT,
    `idMovie` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idWatchList`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserMedia` ADD CONSTRAINT `UserMedia_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DirectorOfImage` ADD CONSTRAINT `DirectorOfImage_idDirector_fkey` FOREIGN KEY (`idDirector`) REFERENCES `Director`(`idDirector`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageOfActor` ADD CONSTRAINT `ImageOfActor_idActor_fkey` FOREIGN KEY (`idActor`) REFERENCES `Actor`(`idActor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieStudios` ADD CONSTRAINT `MovieStudios_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieStudios` ADD CONSTRAINT `MovieStudios_idStudio_fkey` FOREIGN KEY (`idStudio`) REFERENCES `Studios`(`idStudio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieAlternantiveTittle` ADD CONSTRAINT `MovieAlternantiveTittle_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieAlternantiveTittle` ADD CONSTRAINT `MovieAlternantiveTittle_idAlternantiveTittle_fkey` FOREIGN KEY (`idAlternantiveTittle`) REFERENCES `AlternantiveTittles`(`idAlternantiveTittle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Releases` ADD CONSTRAINT `Releases_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Releases` ADD CONSTRAINT `Releases_idCountry_fkey` FOREIGN KEY (`idCountry`) REFERENCES `Countries`(`idCountry`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThemOfMovie` ADD CONSTRAINT `ThemOfMovie_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThemOfMovie` ADD CONSTRAINT `ThemOfMovie_idTema_fkey` FOREIGN KEY (`idTema`) REFERENCES `Temas`(`idTema`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeneroOfMovie` ADD CONSTRAINT `GeneroOfMovie_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeneroOfMovie` ADD CONSTRAINT `GeneroOfMovie_idGenero_fkey` FOREIGN KEY (`idGenero`) REFERENCES `Genero`(`idGenero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LenguageOfMovie` ADD CONSTRAINT `LenguageOfMovie_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LenguageOfMovie` ADD CONSTRAINT `LenguageOfMovie_idLenguage_fkey` FOREIGN KEY (`idLenguage`) REFERENCES `Lengauge`(`idLenguageTalked`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnotherLenguageOfMovie` ADD CONSTRAINT `AnotherLenguageOfMovie_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnotherLenguageOfMovie` ADD CONSTRAINT `AnotherLenguageOfMovie_idLenguage_fkey` FOREIGN KEY (`idLenguage`) REFERENCES `Lengauge`(`idLenguageTalked`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CountryOfMovieWh` ADD CONSTRAINT `CountryOfMovieWh_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CountryOfMovieWh` ADD CONSTRAINT `CountryOfMovieWh_idCountry_fkey` FOREIGN KEY (`idCountry`) REFERENCES `Countries`(`idCountry`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DirectorsOfMovies` ADD CONSTRAINT `DirectorsOfMovies_idDirector_fkey` FOREIGN KEY (`idDirector`) REFERENCES `Director`(`idDirector`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DirectorsOfMovies` ADD CONSTRAINT `DirectorsOfMovies_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cast` ADD CONSTRAINT `Cast_idActor_fkey` FOREIGN KEY (`idActor`) REFERENCES `Actor`(`idActor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cast` ADD CONSTRAINT `Cast_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageOfMovie` ADD CONSTRAINT `ImageOfMovie_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crewOfMovie` ADD CONSTRAINT `crewOfMovie_idCrewOfPeople_fkey` FOREIGN KEY (`idCrewOfPeople`) REFERENCES `CrewOfPeople`(`idCrewOfPeople`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crewOfMovie` ADD CONSTRAINT `crewOfMovie_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reseniaOfMovie` ADD CONSTRAINT `reseniaOfMovie_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reseniaOfMovie` ADD CONSTRAINT `reseniaOfMovie_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_idReseniaOfMovie_fkey` FOREIGN KEY (`idReseniaOfMovie`) REFERENCES `reseniaOfMovie`(`idReseniaOfMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `liked` ADD CONSTRAINT `liked_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `liked` ADD CONSTRAINT `liked_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `whoWached` ADD CONSTRAINT `whoWached_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `whoWached` ADD CONSTRAINT `whoWached_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `whereWatch` ADD CONSTRAINT `whereWatch_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watchList` ADD CONSTRAINT `watchList_idMovie_fkey` FOREIGN KEY (`idMovie`) REFERENCES `Movie`(`idMovie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watchList` ADD CONSTRAINT `watchList_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
