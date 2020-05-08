import { AuthenticationError, ApolloError } from "apollo-server";
import { User, Recipe } from "../../models";
import { authenticate } from "../../lib/utils/auth";

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
  Query: {
    user: async (root, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
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
    loginViaToken: async (root, {}, { req }) => {
      try {
        const user = await authenticate(req);
        return user;
      } catch (error) {
        throw new AuthenticationError(error);
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
  User: {
    recipes: async ({ _id }, { limit, page }) => {
      const total = await Recipe.find({ author: _id }).countDocuments();
      const query = Recipe.find({ author: _id });

      const skips = (page - 1) * limit;

      const recipes = await query.skip(skips).limit(limit);

      const data = {
        total,
        result: recipes,
      };

      return data;
    },
  },
};
