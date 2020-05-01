import mongoose from "mongoose";

export const connectDb = async () => {
  const DB =
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_LOCAL
      : process.env.DATABASE_LOCAL;

  const conn = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
