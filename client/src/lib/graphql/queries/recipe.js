import { gql } from "apollo-boost";

export const RECIPE = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      description
      image
      ratingsCount
      ingredients
      instructions
      author {
        id
        name
        image
      }
    }
  }
`;
