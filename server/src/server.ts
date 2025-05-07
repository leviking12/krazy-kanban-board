import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import express, { Request, Response } from 'express'
import { fileURLToPath } from 'url'
import routes from './routes/index'
import { sequelize } from './models/index'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = Number(process.env.PORT || 3001)
const clientDist = path.resolve(__dirname, '../../client/dist')

app.use(express.static(clientDist))
app.use(express.json())
app.use(routes)
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(clientDist, 'index.html'))
})

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  })
  .catch((err: any) => {
    console.error('Unable to start server:', err)
    process.exit(1)
  })
