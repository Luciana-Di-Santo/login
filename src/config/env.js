const dotenv = require("dotenv");

dotenv.config({ quiet: true });

const VALID_NODE_ENVS = new Set(["development", "test", "production"]);

function requireString(name, fallback) {
    const raw = process.env[name] ?? fallback;
    if (typeof raw !== "string" || raw.trim() === "") {
        throw new Error(`Variable de entorno obligatoria faltante o vacia: ${name}`);
    }
    return raw.trim();
}

function parseInteger(name, fallback, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
    const raw = process.env[name];
    const value = raw === undefined || raw.trim() === "" ? fallback : Number(raw);

    if (!Number.isInteger(value) || value < min || value > max) {
        throw new Error(
            `Variable de entorno invalida: ${name} debe ser un entero entre ${min} y ${max}`
        );
    }
    return value;
}

const nodeEnv = requireString("NODE_ENV", "development");
if (!VALID_NODE_ENVS.has(nodeEnv)) {
    throw new Error(
        `Variable de entorno invalida: NODE_ENV debe ser development, test o production`
    );
}

const env = Object.freeze({
    nodeEnv,
    isProduction: nodeEnv === "production",
    port: parseInteger("PORT", 3000, { min: 1, max: 65535 }),
    lowStockThreshold: parseInteger("LOW_STOCK_THRESHOLD", 5, { min: 0, max: 100000 }),
    db: Object.freeze({
        host: requireString("DB_HOST", "localhost"),
        port: parseInteger("DB_PORT", 5432, { min: 1, max: 65535 }),
        user: requireString("DB_USER"),
        password: requireString("DB_PASSWORD"),
        database: requireString("DB_NAME")
    })
});

module.exports = env;

