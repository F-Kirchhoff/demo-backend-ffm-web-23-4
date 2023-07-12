import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
  joke: String,
});

const Joke = mongoose.models.Joke || mongoose.model("Joke", jokeSchema); // detects automatically that it is used for
// the collection "jokes"

export default Joke;
