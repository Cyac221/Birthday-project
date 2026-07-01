-- CreateTable
CREATE TABLE "KeepAlive" (
    "id" SERIAL NOT NULL,
    "pingedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeepAlive_pkey" PRIMARY KEY ("id")
);
