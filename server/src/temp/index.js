const recipes = require("./r.json");

const difficulty = ["beginner", "intermediate", "advance"];

const description =
  "A handful of simple ingredients typify the fresh, vibrant flavors of Greek cooking.";

const newRecipes = recipes.map((recipe) => {
  const ingredients = recipe.ingredients.map((ingredient) => {
    return `${ingredient.quantity} ${ingredient.name}`;
  });

  return {
    title: recipe.name,
    instructions: recipe.steps,
    image: recipe.imageURL,
    ingredients,
    likesCount: Math.floor(Math.random() * 20) + 1,
    ratingsCount: Math.floor(Math.random() * 5) + 1,
    difficulty: difficulty[Math.floor(Math.random() * difficulty.length)],
    category: recipe.category,
    description,
  };
});

console.log(JSON.stringify(newRecipes));
