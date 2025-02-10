import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IUser } from '../models/user'

const SECRET = 'your_jwt_secret' // Move this to .env in production

// Generate JWT Token
export const generateToken = (user: IUser): string => {
    return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '7d' })
}

// Hash Password
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}

// Verify Password
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}

// Middleware to Authenticate User
export const authenticateUser = (token: string): any => {
    if (!token) throw new Error('Authentication required')
    try {
        return jwt.verify(token, SECRET)
    } catch {
        throw new Error('Invalid or expired token')
    }
}
