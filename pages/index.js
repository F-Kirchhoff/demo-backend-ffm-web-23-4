import JokeForm from "@/components/JokeForm";
import JokeList from "../components/JokeList";

import useSWR from "swr";

export default function HomePage() {
  const { mutate } = useSWR("/api/jokes");

  async function handleCreateJoke(event) {
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
      <JokeForm
        onSubmit={handleCreateJoke}
        isEditMode={false}
        defaultValue={""}
      />
      <JokeList />
    </>
  );
}
