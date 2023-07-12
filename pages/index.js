import JokeList from "../components/JokeList";
import useSWR from "swr";

export default function HomePage() {
  const { mutate } = useSWR("/api/jokes");

  async function handleCreateTestJoke(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    const response = await fetch("/api/jokes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      mutate();

      const data = await response.json();
      console.log(data);
    }
  }

  return (
    <>
      <form action="" onSubmit={handleCreateTestJoke}>
        <label htmlFor="joke">Create a new joke</label>
        <input id="joke" name="joke" type="text" />
        <button type="submit">submit</button>
      </form>
      <JokeList />
    </>
  );
}
