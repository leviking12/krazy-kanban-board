import { Router, Request, Response } from 'express'
import { User } from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const existing = await User.findOne({ where: { username } })
    if (existing) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const user = await User.create({ username, password })
    const secret = process.env.JWT_SECRET
    if (!secret) {
      console.error('JWT_SECRET not set')
      return res.status(500).json({ message: 'Server configuration error' })
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: '1h' }
    )
    return res.json({ token })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const secret = process.env.JWT_SECRET
    if (!secret) {
      console.error('JWT_SECRET not set')
      return res.status(500).json({ message: 'Server configuration error' })
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: '1h' }
    )
    return res.json({ token })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default router
