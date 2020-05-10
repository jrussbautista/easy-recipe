import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import styles from "./CreateRecipe.module.scss";
import { CREATE_RECIPE } from "../../lib/graphql/mutations/createRecipe";

export const CreateRecipe = () => {
  const initialState = {
    title: "",
    description: "",
    image: "",
    category: "",
  };

  const [recipe, setRecipe] = useState(initialState);
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [imagePreview, setImagePreview] = useState(null);

  const [createRecipe, { loading }] = useMutation(CREATE_RECIPE, {
    onCompleted(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      ...recipe,
      ingredients,
      instructions,
      difficulty: "beginner",
      image: imagePreview,
    };
    await createRecipe({ variables: { input } });
  };

  const handleImageChange = (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAdd = (type) => {
    if (type === "ingredients") {
      setIngredients([...ingredients, ""]);
    } else {
      setInstructions([...instructions, ""]);
    }
  };

  const handleDynamicInput = (e, type) => {
    if (type === "ingredients") {
      const newIngredients = [...ingredients];
      newIngredients[e.target.dataset.id] = e.target.value;
      setIngredients(newIngredients);
    } else {
      const newInstructions = [...instructions];
      newInstructions[e.target.dataset.id] = e.target.value;
      setInstructions(newInstructions);
    }
  };

  return (
    <div className={styles.createRecipe}>
      <h2> Create your own recipe </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title"> Title: </label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description"> Description: </label>
          <input type="text" name="description" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description"> Category: </label>
          <select onChange={handleChange} name="category">
            <option value="appetizers">Appetizers</option>
            <option value="beef">Beef</option>
          </select>
        </div>
        <div>
          <label htmlFor="description"> Image: </label>
          <input type="file" name="image" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <img src={imagePreview} style={{ width: 200 }} />
            </div>
          )}
        </div>
        <div>
          <label> Ingredients: </label>
          {ingredients.map((ingredient, i) => (
            <div key={i}>
              <input
                type="text"
                name={`ingredient-${i}`}
                data-id={i}
                onChange={(e) => handleDynamicInput(e, "ingredients")}
              />
            </div>
          ))}
          <button onClick={() => handleAdd("ingredients")} type="button">
            Add more ingredient
          </button>
        </div>
        <div>
          <label htmlFor="description"> Instructions: </label>
          {instructions.map((instruction, i) => (
            <div key={i}>
              <input
                type="text"
                name={`instruction-${i}`}
                data-id={i}
                onChange={(e) => handleDynamicInput(e, "instructions")}
              />
            </div>
          ))}
          <button onClick={() => handleAdd("instructions")} type="button">
            Add more instruction
          </button>
        </div>
        <div>
          <button type="submit"> Submit </button>
        </div>
      </form>
    </div>
  );
};
