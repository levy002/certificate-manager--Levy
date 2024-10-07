-- create certificates schema
CREATE SCHEMA IF NOT EXISTS certificates;

-- create departments table
CREATE TABLE IF NOT EXISTS certificates.departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create suppliers table
CREATE TABLE IF NOT EXISTS certificates.suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create users table
CREATE TABLE IF NOT EXISTS certificates.users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    department_id BIGINT NOT NULL,
    plant VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_department
        FOREIGN KEY (department_id) REFERENCES certificates.departments(id)
);

-- create certificates table
CREATE TABLE IF NOT EXISTS certificates.certificates (
    id SERIAL PRIMARY KEY,
    supplier_id BIGINT NOT NULL,
    certificate_type VARCHAR(255) NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    pdf_file BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_supplier
        FOREIGN KEY (supplier_id) REFERENCES certificates.suppliers(id)
);

-- create assigned_users join table
CREATE TABLE IF NOT EXISTS certificates.assigned_users (
    certificate_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    PRIMARY KEY (certificate_id, user_id),

    CONSTRAINT fk_certificate
        FOREIGN KEY (certificate_id) REFERENCES certificates.certificates(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES certificates.users(id)
        ON DELETE CASCADE
);

-- create comments table
CREATE TABLE IF NOT EXISTS certificates.comments (
    id SERIAL PRIMARY KEY,
    certificate_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_certificate_comments
        FOREIGN KEY (certificate_id) REFERENCES certificates.certificates(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_comments
        FOREIGN KEY (user_id) REFERENCES certificates.users(id)
        ON DELETE CASCADE
);
