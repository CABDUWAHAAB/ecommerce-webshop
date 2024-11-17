import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Product Type
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    createdAt: String!
    updatedAt: String!
  }

  # Product Queries
  type Query {
    getProducts: [Product!]!
    getProduct(id: ID!): Product
  }

  # Product Mutations
  type Mutation {
    addProduct(name: String!, description: String!, price: Float!, stock: Int!): Product!
    updateProduct(id: ID!, name: String, description: String, price: Float, stock: Int): Product
    deleteProduct(id: ID!): Boolean!
  }
`;

export default typeDefs;
