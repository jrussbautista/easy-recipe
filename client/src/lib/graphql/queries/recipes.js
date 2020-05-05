import { gql } from "apollo-boost";

export const RECIPES = gql`
  query Recipes($limit: Int!, $page: Int!) {
    recipes(limit: $limit, page: $page) {
      total
      result {
        id
        title
        description
        image
        ratingsCount
        author {
          id
          name
        }
      }
    }
  }
`;
