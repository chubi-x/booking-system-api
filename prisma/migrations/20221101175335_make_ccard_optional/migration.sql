-- AlterTable
ALTER TABLE "CreditCardDetails" ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "cvv" DROP NOT NULL,
ALTER COLUMN "expiryDate" DROP NOT NULL,
ALTER COLUMN "expiryDate" SET DATA TYPE DATE;
