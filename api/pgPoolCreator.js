const { Pool } = require('pg')
const connectionstring = WGA_POSTGRES_CONNECTION
const pool = new Pool(connectionstring)

module.exports = pool
