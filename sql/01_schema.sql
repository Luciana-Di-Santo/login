-- =============================================================
-- Esquema de base de datos - Inventario de Hardware (PostgreSQL 18)
-- Ejecutar conectado a inventario_db o inventario_db_test
-- =============================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE CHECK (char_length(btrim(usuario)) > 0),
    password VARCHAR(255) NOT NULL CHECK (char_length(password) > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS productos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL CHECK (char_length(btrim(nombre)) > 0),
    categoria VARCHAR(60) NOT NULL CHECK (char_length(btrim(categoria)) > 0),
    precio NUMERIC(12, 2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    descripcion TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Esquema contrastado con connect-pg-simple@10.0.0 (table.sql)
-- Se usa tableName: 'user_sessions' y createTableIfMissing: false
CREATE TABLE IF NOT EXISTS user_sessions (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    CONSTRAINT user_sessions_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE
);

-- Indice requerido por connect-pg-simple para purgar sesiones vencidas
CREATE INDEX IF NOT EXISTS idx_user_sessions_expire ON user_sessions (expire);

