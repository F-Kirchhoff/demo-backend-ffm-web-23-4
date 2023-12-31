import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import JokeForm from "../JokeForm";

export default function Joke() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/jokes/${id}`);

  async function handleEditJoke(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`/api/jokes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      mutate();
    }
  }

  async function handleDeleteJoke() {
    const response = await fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke} </h1>
      <JokeForm
        onSubmit={handleEditJoke}
        defaultValue={data.joke}
        isEditMode={true}
      />
      <button onClick={handleDeleteJoke}>Delete Joke</button>
      <Link href="/">Back to all</Link>
    </>
  );
}
