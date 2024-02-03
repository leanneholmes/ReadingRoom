/*
  Warnings:

  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `first_name` VARCHAR(50) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(50) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;
