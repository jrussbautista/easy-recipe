require("dotenv").config();
import fs from "fs";
import { connectDb } from "../database";
import { User } from "../models";

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await connectDb();
    await User.create(users);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importData();
