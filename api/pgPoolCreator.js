const { Pool } = require('pg')
const connectionString = process.env.WGA_POSTGRES_CONNECTION
console.log('prepool')
const pool = new Pool({ connectionString })
console.log('postpool')
pool.connect().then(console.log('postconnection'))

module.exports = pool
