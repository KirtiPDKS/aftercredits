require("../mongodb_helper");
const mongoose = require("mongoose");
const MoviesWatched = require("../../models/moviesWatched");

describe("MoviesWatched model", () => {
  beforeEach(async () => {
    await MoviesWatched.deleteMany({});
  });

  it("has a user_id and movie_id", () => {
    const userId = new mongoose.Types.ObjectId();
    const movieId = new mongoose.Types.ObjectId();

    const entry = new MoviesWatched({ user_id: userId, movie_id: movieId });

    expect(entry.user_id.toString()).toEqual(userId.toString());
    expect(entry.movie_id.toString()).toEqual(movieId.toString());
  });

  it("has a review and rating", () => {
    const userId = new mongoose.Types.ObjectId();
    const movieId = new mongoose.Types.ObjectId();

    const entry = new MoviesWatched({
      user_id: userId,
      movie_id: movieId,
      review: "An absolute masterpiece.",
      rating: 5,
    });

    expect(entry.review).toEqual("An absolute masterpiece.");
    expect(entry.rating).toEqual(5);
  });

  it("requires a user_id", async () => {
    const movieId = new mongoose.Types.ObjectId();
    const entry = new MoviesWatched({ movie_id: movieId });

    let error;
    try {
      await entry.save();
    } catch (err) {
      error = err;
    }

    expect(error.errors["user_id"]).toBeDefined();
  });

  it("requires a movie_id", async () => {
    const userId = new mongoose.Types.ObjectId();
    const entry = new MoviesWatched({ user_id: userId });

    let error;
    try {
      await entry.save();
    } catch (err) {
      error = err;
    }

    expect(error.errors["movie_id"]).toBeDefined();
  });

  it("can save without a review or rating", async () => {
    const userId = new mongoose.Types.ObjectId();
    const movieId = new mongoose.Types.ObjectId();

    const entry = new MoviesWatched({ user_id: userId, movie_id: movieId });
    await entry.save();

    const entries = await MoviesWatched.find();
    expect(entries.length).toEqual(1);
    expect(entries[0].review).toBeUndefined();
    expect(entries[0].rating).toBeUndefined();
  });
});