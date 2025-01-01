import classes from "./form.module.css";
import ImagePicker from "@/components/meals/image-picker/image-picker";
import MealFormSubmit from "@/components/shared/form/form-submit-button";

function Form({ action, state, meal }) {
  const safeState = state || { message: "" };
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={action}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={meal ? meal.creator : ""}
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                defaultValue={meal ? meal.creator_email : ""}
              />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={meal ? meal.title : ""}
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              required
              defaultValue={meal ? meal.summary : ""}
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
              defaultValue={meal ? meal.instructions : ""}
            ></textarea>
          </p>
          <ImagePicker
            label="Your Image"
            name="image"
            defaultImage={meal ? meal.image : null}
          />
          <p>{safeState.message && <p>{safeState.message}</p>}</p>
          <p className={classes.actions}>
            <MealFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}

export default Form;
