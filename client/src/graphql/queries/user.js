import { gql } from "apollo-boost";

export const USER = gql`
  query User($id: ID!, $page: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      email
      image
      recipes(page: $page, limit: $limit) {
        total
        result {
          id
          title
          image
          ratingsCount
        }
      }
    }
  }
`;
