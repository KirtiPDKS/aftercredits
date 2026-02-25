require("../mongodb_helper");
const mongoose = require("mongoose");
const MoviesToWatch = require("../../models/moviesToWatch");

describe("MoviesToWatch model", () => {
  beforeEach(async () => {
    await MoviesToWatch.deleteMany({});
  });

  it("has a user_id and movie_id", () => {
    const userId = new mongoose.Types.ObjectId();
    const movieId = new mongoose.Types.ObjectId();

    const entry = new MoviesToWatch({ user_id: userId, movie_id: movieId });

    expect(entry.user_id.toString()).toEqual(userId.toString());
    expect(entry.movie_id.toString()).toEqual(movieId.toString());
  });

  it("requires a user_id", async () => {
    const movieId = new mongoose.Types.ObjectId();
    const entry = new MoviesToWatch({ movie_id: movieId });

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
    const entry = new MoviesToWatch({ user_id: userId });

    let error;
    try {
      await entry.save();
    } catch (err) {
      error = err;
    }

  expect(error.errors["movie_id"]).toBeDefined();
  });


  it("can list all entries", async () => {
    const entries = await MoviesToWatch.find();
    expect(entries.length).toEqual(0);
  });

  it("can save an entry", async () => {
    const userId = new mongoose.Types.ObjectId();
    const movieId = new mongoose.Types.ObjectId();

    const entry = new MoviesToWatch({ user_id: userId, movie_id: movieId });
    await entry.save();

    const entries = await MoviesToWatch.find();
    expect(entries[0].user_id.toString()).toEqual(userId.toString());
    expect(entries[0].movie_id.toString()).toEqual(movieId.toString());
  });
});