import { AuthenticationError, ApolloError } from "apollo-server";
import { User } from "../../models";

const sendAuthResponse = (user) => {
  const token = user.getToken();

  const { name, email, _id } = user;

  return {
    id: _id,
    name,
    email,
    token,
  };
};

export const userResolvers = {
  Mutation: {
    login: async (root, { input }) => {
      try {
        const { email, password } = input;

        const user = await User.findOne({ email }).select("+password");

        if (!user)
          throw new AuthenticationError("Email or password is incorrect");

        const isMatchPassword = await user.matchPassword(password);
        if (!isMatchPassword)
          throw new AuthenticationError("Email or password is incorrect");

        return sendAuthResponse(user);
      } catch (error) {
        console.log(error);
        throw new ApolloError(error);
      }
    },
    register: async (root, { input }) => {
      try {
        const user = await User.create(input);
        return sendAuthResponse(user);
      } catch (error) {
        throw new Error(`Can't create user: ${error}`);
      }
    },
  },
};
