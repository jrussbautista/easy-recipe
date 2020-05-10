import { gql } from "apollo-boost";

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: RecipeInput!) {
    createRecipe(input: $input) {
      id
      image
      title
    }
  }
`;
