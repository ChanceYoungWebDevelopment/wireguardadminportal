const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.WGA_POSTGRES_USER,
    host: process.env.WGA_POSTGRES_HOST,
    database: process.env.WGA_POSTGRES_DB,
    password: process.env.WGA_POSTGRES_PASSWORD,
    port: 5432,
})

module.exports = pool
