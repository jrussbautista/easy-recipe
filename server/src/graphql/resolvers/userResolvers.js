import { AuthenticationError, UserInputError } from "apollo-server";
import { User, Recipe } from "../../models";
import { authenticate } from "../../lib/utils/auth";

const validateRegisterInput = (input) => {
  const errors = [];
  const { email, name, password } = input;

  if (email.trim() === "") {
    const error = { field: "email", message: "Email is required" };
    errors.push(error);
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      const error = { field: "email", message: "Email is not a valid email" };
      errors.push(error);
    }
  }

  if (name.trim().length < 6) {
    const error = {
      field: "name",
      message: "Name must have a 6 characters length",
    };
    errors.push(error);
  }

  if (password.trim().length < 6) {
    const error = {
      field: "password",
      message: "Password must have a 6 characters length",
    };
    errors.push(error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const validateLoginInput = (input) => {
  const errors = [];
  const { email, password } = input;

  if (email.trim() === "") {
    const error = { field: "email", message: "Email is required" };
    errors.push(error);
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      const error = { field: "email", message: "Email is not a valid email" };
      errors.push(error);
    }
  }

  if (password.trim().length < 6) {
    const error = {
      field: "password",
      message: "Password must have a 6 characters length",
    };
    errors.push(error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

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
      const { isValid, errors } = validateLoginInput(input);
      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }
      const { email, password } = input;

      const user = await User.findOne({ email }).select("+password");

      if (!user)
        throw new UserInputError("Wrong Credentials", {
          errors: [{ message: "Email or password is incorrect" }],
        });

      const isMatchPassword = await user.matchPassword(password);
      if (!isMatchPassword)
        throw new UserInputError("Wrong Credentials", {
          errors: [{ message: "Email or password is incorrect" }],
        });

      return sendAuthResponse(user);
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
      const { isValid, errors } = validateRegisterInput(input);

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email: input.email });
      if (user) {
        throw new UserInputError("Email is taken", {
          errors: [{ message: "Email is Already taken", field: "email" }],
        });
      }

      const userData = await User.create(input);
      return sendAuthResponse(userData);
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
