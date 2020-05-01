import mongoose from "mongoose";

const DB = `mongodb://localhost:27017/easy-recipe`;

export const connectDb = async () => {
  const conn = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
