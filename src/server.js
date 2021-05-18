const knex = require('knex')
const app = require('./app')

const { PORT, DATABASE_URL} = require('./config')
// Create a knex instance
const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})
// Use knex in app
app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})