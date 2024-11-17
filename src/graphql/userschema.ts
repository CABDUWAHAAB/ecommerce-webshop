import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  # User Type
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  # Auth Payload Type
  type AuthPayload {
    token: String!
    user: User!
  }

  # User Queries
  extend type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
  }

  # User Mutations
  extend type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

export default userTypeDefs;
