import { IUser } from '../models/user'

export interface AuthPayload {
    user: IUser
    token: string
}
