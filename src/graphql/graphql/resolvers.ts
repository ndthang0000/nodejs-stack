import User, { IUser } from '../models/user'

const resolvers = {
  Query: {
    getUsers: async (): Promise<IUser[]> => await User.find(),
    getUser: async (_: any, { id }: { id: string }): Promise<IUser | null> => await User.findById(id)
  },
  Mutation: {
    addUser: async (_: any, { name, email, age }: { name: string; email: string; age?: number }): Promise<IUser> => {
      const user = new User({ name, email, age })
      await user.save()
      return user
    },
    updateUser: async (
      _: any,
      { id, name, email, age }: { id: string; name?: string; email?: string; age?: number }
    ): Promise<IUser | null> => await User.findByIdAndUpdate(id, { name, email, age }, { new: true }),

    deleteUser: async (_: any, { id }: { id: string }): Promise<string> => {
      await User.findByIdAndDelete(id)
      return 'User deleted successfully'
    }
  }
}

export default resolvers
