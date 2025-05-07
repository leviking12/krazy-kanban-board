import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import routes from './routes/index.js'
import { sequelize } from './models/index.js'

const app = express()
const PORT = Number(process.env.PORT || 3001)

app.use(express.json())
app.use(routes)

sequelize
  .authenticate()
  .then(() => console.log('Connected to Postgres:', process.env.DB_URL))
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('Unable to connect to Postgres:', err)
    process.exit(1)
  })
