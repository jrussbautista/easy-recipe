import { gql } from "apollo-boost";

export const CATEGORY = gql`
  query Category($id: ID!, $page: Int!, $limit: Int!) {
    category(id: $id) {
      id
      image
      title
      recipes(page: $page, limit: $limit) {
        total
        result {
          id
          title
          description
          image
          ratingsCount
        }
      }
    }
  }
`;
