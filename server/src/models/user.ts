import { DataTypes, Sequelize, Model, Optional } from 'sequelize'
import bcrypt from 'bcryptjs'

interface UserAttributes {
  id: number
  username: string
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public password!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(password, salt)
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => { await user.setPassword(user.password) },
        beforeUpdate: async (user: User) => { await user.setPassword(user.password) }
      }
    }
  )
  return User
}
