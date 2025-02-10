import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        role: String!
        createdAt: String
        updatedAt: String
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        getUsers: [User]
        getUser(id: ID!): User
    }

    type Mutation {
        register(name: String!, email: String!, password: String!, age: Int!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        addUser(name: String!, email: String!, age: Int, password: String!): User
        updateUser(id: ID!, name: String, email: String, age: Int): User
        deleteUser(id: ID!): String
    }

    type Subscription {
        userAdded: User
    }
`

export default typeDefs
