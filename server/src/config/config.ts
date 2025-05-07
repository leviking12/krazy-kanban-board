import { Dialect } from 'sequelize'
import 'dotenv/config'

interface ConfigEntry {
  url: string
  dialect: Dialect
}

const config: Record<'development' | 'production', ConfigEntry> = {
  development: {
    url: process.env.DB_URL!,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DB_URL!,
    dialect: 'postgres'
  }
}

export default config
