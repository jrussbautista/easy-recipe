import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import { User } from "../../models";

export const authenticate = async (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw new AuthenticationError("Invalid token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // check if user is exist
    const user = await User.findById(decoded.userId);
    if (!user) throw new AuthenticationError("User not found");
    return user;
  } catch (error) {
    throw new AuthenticationError("Invalid token");
  }
};
