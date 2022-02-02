const { Pool } = require('pg')
const connectionString = process.env.WGA_POSTGRES_CONNECTION
const pool = new Pool({ connectionString })

module.exports = pool
