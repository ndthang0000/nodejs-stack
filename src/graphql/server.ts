import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import connectDB from './db'
import jwt from 'jsonwebtoken'
dotenv.config()
connectDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || ''
        const user = token ? jwt.verify(token, 'your_jwt_secret') : null
        console.log({ context: user })
        return { user }
    }
})

server.listen({ port: process.env.PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
