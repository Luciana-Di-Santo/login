const { Pool } = require("pg");
const env = require("./env");

// pg mantiene los campos NUMERIC/DECIMAL como strings exactos por defecto (OID 1700),
// evitando perdidas de precision por conversion a Number (IEEE 754).
const pool = new Pool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
});

pool.on("error", (err) => {
    console.error("Error inesperado en cliente inactivo del pool de PostgreSQL:", err.message);
});

async function checkDbConnection() {
    const { rows } = await pool.query(
        "SELECT current_database() AS database, current_user AS user, version() AS version"
    );
    return rows[0];
}

async function closeDbPool() {
    await pool.end();
}

module.exports = {
    pool,
    checkDbConnection,
    closeDbPool
};

