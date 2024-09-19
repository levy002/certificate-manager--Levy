ALTER DATABASE certificates SET search_path TO certificates;

CREATE TABLE suppliers (
    index BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE departments (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    department_id BIGINT NOT NULL REFERENCES department(id),
    plant VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

CREATE TYPE certificate_type_enum AS ENUM (
    'Permission of Printing',
    'OHSAS 18001'
);

CREATE TABLE certificates (
    id BIGINT PRIMARY KEY,
    supplier_id BIGINT REFERENCES supplier(id) ON DELETE CASCADE,
    certificate_type certificate_type_enum NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    pdf_file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE assigned_users (
    certificate_id BIGINT REFERENCES certificate(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES user(id) ON DELETE CASCADE,
    PRIMARY KEY (certificate_id, user_id)
);