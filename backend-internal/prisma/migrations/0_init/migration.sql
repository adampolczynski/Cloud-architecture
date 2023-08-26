-- CreateTable
CREATE TABLE "Admin_users" (
    "id" VARCHAR(255) NOT NULL DEFAULT concat('au-', uuid_generate_v4()),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" VARCHAR(255) NOT NULL DEFAULT concat('img-', uuid_generate_v4()),
    "uri" VARCHAR(255) NOT NULL,
    "data" BYTEA,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" VARCHAR(255) NOT NULL DEFAULT concat('log-', uuid_generate_v4()),
    "error" BOOLEAN,
    "message" TEXT,
    "reference" JSONB,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_users_email_key" ON "Admin_users"("email");

