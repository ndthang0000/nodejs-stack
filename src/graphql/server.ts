import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import connectDB from './db'

dotenv.config()
connectDB()

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
