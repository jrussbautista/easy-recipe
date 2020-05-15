import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_RECIPE } from "../../lib/graphql/mutations/createRecipe";
import { Button } from "../../components/Common";
import { useToast, useAlert } from "../../store";
import { BsFillImageFill } from "react-icons/bs";
import Seo from "../../components/Seo";
import PageLoading from "../../components/PageLoading";
import Alert from "../../components/Alert";
import styles from "./CreateRecipe.module.scss";

export const CreateRecipe = () => {
  const initialState = {
    title: "",
    description: "",
    image: "",
    category: "beef",
    difficulty: "beginner",
  };

  const [recipe, setRecipe] = useState(initialState);
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [imagePreview, setImagePreview] = useState("");
  const { setToast } = useToast();
  const { errors, setAlert, removeAlert, type } = useAlert();
  const history = useHistory();

  const [createRecipe, { loading }] = useMutation(CREATE_RECIPE, {
    onCompleted(data) {
      const { id } = data.createRecipe;
      setToast("success", "Success", "Successfully recipe created");
      history.push(`/recipe/${id}`);
    },
    onError(error) {
      window.scrollTo(0, 0);
      setAlert("error", error.graphQLErrors[0].extensions.exception.errors);
    },
  });

  useEffect(() => {
    return () => removeAlert();
  }, []);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      ...recipe,
      ingredients,
      instructions,
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

  const handleCloseAlert = () => {
    removeAlert();
  };

  return (
    <div className={styles.createRecipe}>
      <Seo
        title="Easy Recipe - Create Recipe"
        description="Easy recipe create recipe page"
      />
      {loading && <PageLoading />}
      <h2> Create your own recipe </h2>
      <Alert type={type} alerts={errors} close={handleCloseAlert} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="title"> Title: </label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div className={styles.group}>
          <label htmlFor="description"> Description: </label>
          <textarea
            type="text"
            name="description"
            className={styles.textArea}
            onChange={handleChange}
            defaultValue={recipe.description}
          ></textarea>
        </div>
        <div className={styles.group}>
          <label htmlFor="description"> Category: </label>
          <select onChange={handleChange} name="category">
            <option value="appetizers">Appetizers</option>
            <option value="beef">Beef</option>
          </select>
        </div>
        <div className={styles.group}>
          <label htmlFor="description"> Difficulty: </label>
          <select onChange={handleChange} name="difficulty">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className={styles.group}>
          <label htmlFor="description"> Image: </label>
          <div className={styles.inputFile}>
            <input type="file" name="image" onChange={handleImageChange} />
            <div className={styles.fileBtn}>
              <BsFillImageFill color={`var(--color-primary)`} />
              <div className={styles.fileBtnText}> Upload Image </div>
            </div>
          </div>
          {imagePreview && (
            <div className={styles.imgPreview}>
              <img src={imagePreview} alt="recipe-img-preview" />
            </div>
          )}
        </div>
        <div className={styles.group}>
          <label> Ingredients: </label>
          {ingredients.map((ingredient, i) => (
            <div key={i} className={styles.inputItem}>
              <input
                type="text"
                name={`ingredient-${i}`}
                data-id={i}
                onChange={(e) => handleDynamicInput(e, "ingredients")}
              />
            </div>
          ))}

          <Button
            onClick={() => handleAdd("ingredients")}
            type="button"
            title="Add Ingredient"
            classType="outline"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="description"> Instructions: </label>
          {instructions.map((instruction, i) => (
            <div key={i} className={styles.inputItem}>
              <input
                type="text"
                name={`instruction-${i}`}
                data-id={i}
                onChange={(e) => handleDynamicInput(e, "instructions")}
              />
            </div>
          ))}
          <Button
            onClick={() => handleAdd("instructions")}
            type="button"
            title="Add Instruction"
            classType="outline"
          />
        </div>
        <div className={styles.group} style={{ marginTop: "2rem" }}>
          <Button type="submit" title="Submit" style={{ width: "100%" }} />
        </div>
      </form>
    </div>
  );
};
