import User, { IUser } from '../models/user'
import { AuthPayload } from '../types/AuthPayload'
import { comparePasswords, generateToken, hashPassword } from '../utils/auth'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

const resolvers = {
    Query: {
        getUsers: async (): Promise<IUser[]> => await User.find(),
        getUser: async (_: any, { id }: { id: string }): Promise<IUser | null> => await User.findById(id)
    },
    Mutation: {
        register: async (_: any, { name, email, password, age }: any): Promise<AuthPayload> => {
            const hashedPassword = await hashPassword(password)
            const user = new User({ name, email, password: hashedPassword, age })
            await user.save()
            pubsub.publish('USER_ADDED', { userAdded: user })

            return { token: generateToken(user), user }
        },

        login: async (_: any, { email, password }: any): Promise<AuthPayload> => {
            const user = await User.findOne({ email })
            if (!user || !(await comparePasswords(password, user.password))) {
                throw new Error('Invalid credentials')
            }
            return { token: generateToken(user), user }
        },
        updateUser: async (
            _: any,
            { id, name, email, age }: { id: string; name?: string; email?: string; age?: number }
        ): Promise<IUser | null> => await User.findByIdAndUpdate(id, { name, email, age }, { new: true }),

        deleteUser: async (_: any, { id }: { id: string }): Promise<string> => {
            await User.findByIdAndDelete(id)
            return 'User deleted successfully'
        }
    },
    Subscription: {
        userAdded: {
            subscribe: () => {
                console.log('vo day roi')
                ;(pubsub as any).asyncIterator('USER_ADDED')
            }
        }
    }
}

export default resolvers
