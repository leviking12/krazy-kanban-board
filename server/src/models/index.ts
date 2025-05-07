import dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'
import { UserFactory } from './user'
import { TicketFactory } from './ticket'

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME!,
      process.env.DB_USER!,
      process.env.DB_PASSWORD!,
      {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        dialect: 'postgres',
        dialectOptions: { decimalNumbers: true }
      }
    )

const User = UserFactory(sequelize)
const Ticket = TicketFactory(sequelize)

User.hasMany(Ticket, { foreignKey: 'assignedUserId' })
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' })

export { sequelize, User, Ticket }
