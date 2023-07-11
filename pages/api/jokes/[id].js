// import { jokes } from "../../../lib/data.js";
import dbConnect from "@/db/connect";
import Joke from "@/db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const joke = await Joke.findById(id);

    if (!joke) {
      response.status(404).json({ status: "Joke not found." });
      return;
    }

    response.status(200).json(joke);
    return;
  }

  request.status(405).json({ status: "Request method not implemented." });
}
