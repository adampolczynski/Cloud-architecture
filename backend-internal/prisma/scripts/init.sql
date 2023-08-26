CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE admin_users (
    id VARCHAR(255) PRIMARY KEY NOT NULL DEFAULT CONCAT('au-', uuid_generate_v4()),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password TEXT NOT NULL
);

CREATE TABLE logs (
    id VARCHAR(255) PRIMARY KEY NOT NULL DEFAULT CONCAT('log-', uuid_generate_v4()),
    error BOOLEAN,
    message TEXT,
    reference JSONB
);

CREATE TABLE images (
    id VARCHAR(255) PRIMARY KEY NOT NULL DEFAULT CONCAT('img-', uuid_generate_v4()),
    uri VARCHAR(255) NOT NULL,
    data BYTEA
);
