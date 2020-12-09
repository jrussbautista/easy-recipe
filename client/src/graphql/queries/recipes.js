import { gql } from "apollo-boost";

export const RECIPES = gql`
  query Recipes($limit: Int!, $page: Int!, $keyword: String) {
    recipes(limit: $limit, page: $page, keyword: $keyword) {
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
