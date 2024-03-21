-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `identificacion` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,
    `cuerda` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `estatura` INTEGER NOT NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,
    `foto` LONGBLOB NULL,
    `id_codigo_act` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_id_usuario_id_codigo_act_key`(`id_usuario`, `id_codigo_act`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodigoActivacion` (
    `id_codigo_act` INTEGER NOT NULL AUTO_INCREMENT,
    `cod_activacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_codigo_act`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_codigo_act_fkey` FOREIGN KEY (`id_codigo_act`) REFERENCES `CodigoActivacion`(`id_codigo_act`) ON DELETE RESTRICT ON UPDATE CASCADE;
