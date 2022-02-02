const { Pool } = require('pg')
const connectionString = process.env.WGA_POSTGRES_CONNECTION
console.log('prepool')
const pool = new Pool({ connectionString })
console.log('postpool')

module.exports = pool
