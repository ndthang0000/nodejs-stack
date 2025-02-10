import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    name: string
    email: string
    age?: number
    password: string
    role: 'USER' | 'ADMIN'
    createdAt: Date
    updatedAt: Date
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number },
        password: { type: String, required: true },
        role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IUser>('User', UserSchema)
