import { gql } from "apollo-boost";

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      email
      image
      token
    }
  }
`;
