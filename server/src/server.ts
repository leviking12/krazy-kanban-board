import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import express from 'express'
import routes from './routes/index.js'
import { sequelize } from './models/index.js'

const app = express()
const PORT = Number(process.env.PORT || 3001)
const clientDist = path.resolve(__dirname, '../../client/dist')

app.use(express.static(clientDist))
app.use(express.json())
app.use(routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'))
})

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT)
  })
  .catch(() => {
    process.exit(1)
  })
