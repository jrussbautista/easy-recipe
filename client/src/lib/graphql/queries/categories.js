import { gql } from "apollo-boost";

export const CATEGORIES = gql`
  query Categories {
    categories {
      id
      title
      image
    }
  }
`;
