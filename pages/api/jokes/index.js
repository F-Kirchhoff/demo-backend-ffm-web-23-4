// import { jokes } from "../../../lib/data.js";

import dbConnect from "@/db/connect";
import Joke from "@/db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const jokes = await Joke.find();
    response.status(200).json(jokes);
    return;
  }

  if (request.method === "POST") {
    const newJoke = request.body;

    console.log(newJoke);

    await Joke.create(newJoke);

    response.status(200).json({ status: "Joke created." });
    return;
  }

  response.status(405).json({ status: "Request method not implemented." });
}
