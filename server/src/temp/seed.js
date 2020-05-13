require("dotenv").config();
import fs from "fs";
import { connectDb } from "../database";
import { Recipe, User, Category } from "../models";

// READ JSON FILE
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
// const recipes = JSON.parse(
//   fs.readFileSync(`${__dirname}/recipes.json`, "utf-8")
// );

const category = JSON.parse(
  fs.readFileSync(`${__dirname}/category.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await connectDb();
    await Category.create(category);
    // await Recipe.create(recipes);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importData();
