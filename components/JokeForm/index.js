export default function JokeForm({ onSubmit, isEditMode, defaultValue }) {
  return (
    <form action="" onSubmit={onSubmit}>
      <label htmlFor="joke">
        {isEditMode ? "Edit your joke" : "Create a new joke"}
      </label>
      <input id="joke" name="joke" type="text" defaultValue={defaultValue} />
      <button type="submit">submit</button>
    </form>
  );
}
