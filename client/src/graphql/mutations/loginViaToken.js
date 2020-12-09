import { gql } from "apollo-boost";

export const LOGIN_VIA_TOKEN = gql`
  mutation LoginViaToken {
    loginViaToken {
      id
      name
      email
      image
    }
  }
`;
