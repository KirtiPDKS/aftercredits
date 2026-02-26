const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");
const Movie = require("../../models/movies");
const MoviesWatched = require("../../models/moviesWatched");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      sub: userId,
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
}

let token;
let userId; 
let movieId;

describe("/moviesWatched", () => {
  beforeAll(async () => {
    const user = new User({
      email: "watchlist-test@test.com",
      username: "movie-addict",
      password: "12345678",
    });
    await user.save();
    userId = user.id;

    const movie = new Movie({ title: "The Sound of Music" });
    await movie.save();
    movieId = movie.id;

    token = createToken(userId);
  });

  afterEach(async () => {
    await MoviesWatched.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Movie.deleteMany({});
  });

  // --- POST routes---

  describe("POST, when a valid token is present", () => {
    test("responds with 201", async () => {
      const response = await request(app)
        .post("/moviesWatched")
        .set("Authorization", `Bearer ${token}`)
        .send({ user_id: userId, movie_id: movieId });

      expect(response.status).toEqual(201);
    });

    test("creates a new moviesWatched entry", async () => {
      await request(app)
        .post("/moviesWatched")
        .set("Authorization", `Bearer ${token}`)
        .send({ user_id: userId, movie_id: movieId });

      const entries = await MoviesWatched.find();
      expect(entries.length).toEqual(1);
      expect(entries[0].movie_id.toString()).toEqual(movieId.toString());
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .post("/moviesWatched")
        .set("Authorization", `Bearer ${token}`)
        .send({ user_id: userId, movie_id: movieId });

      const newTokenDecoded = JWT.decode(response.body.token, secret);
      const oldTokenDecoded = JWT.decode(token, secret);
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });

    test("can save with a review and rating", async () => {
      await request(app)
      .post("/moviesWatched")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: userId, movie_id: movieId, review: "Was poor.", rating: 2 });

      const entries = await MoviesWatched.find();
      expect(entries[0].review).toEqual("Was poor.");
      expect(entries[0].rating).toEqual(2);
    });

   test("can save without a review or rating", async () => {
    await request(app)
    .post("/moviesWatched")
    .set("Authorization", `Bearer ${token}`)
    .send({ user_id: userId, movie_id: movieId });

    const entries = await MoviesWatched.find();
    expect(entries.length).toEqual(1);  
  });

});

  describe("POST, when token is missing", () => {
    test("responds with 401", async () => {
      const response = await request(app)
        .post("/moviesWatched")
        .send({ user_id: userId, movie_id: movieId });

      expect(response.status).toEqual(401);
    });

    test("does not create an entry", async () => {
      await request(app)
        .post("/moviesWatched")
        .send({ user_id: userId, movie_id: movieId });

      const entries = await MoviesWatched.find();
      expect(entries.length).toEqual(0);
    });
  });

  // --- GET routes---

  describe("GET, when a valid token is present", () => {
    test("responds with 200", async () => {
      const response = await request(app)
        .get("/moviesWatched")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns all moviesWatched entries", async () => {
      await new MoviesWatched({ user_id: userId, movie_id: movieId }).save();

      const response = await request(app)
        .get("/moviesWatched")
        .set("Authorization", `Bearer ${token}`);

      expect(response.body.movies.length).toEqual(1);
      expect(response.body.movies[0].movie_id.toString()).toEqual(movieId.toString());
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .get("/moviesWatched")
        .set("Authorization", `Bearer ${token}`);

      const newTokenDecoded = JWT.decode(response.body.token, secret);
      const oldTokenDecoded = JWT.decode(token, secret);
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("responds with 401", async () => {
      const response = await request(app).get("/moviesWatched");
      expect(response.status).toEqual(401);
    });

    test("returns no movies", async () => {
      const response = await request(app).get("/moviesWatched");
      expect(response.body.movies).toEqual(undefined);
    });
  });
});

// --- DELETE routes---

describe("DELETE, when a valid token is present", () => {
  test("removes a moviesWatched entry", async () => {
    const entry = await new MoviesWatched({
      user_id: userId,
      movie_id: movieId,
    }).save();

    const response = await request(app)
      .delete(`/moviesWatched/${movieId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);

    const entries = await MoviesWatched.find();
    expect(entries.length).toEqual(0);
  });

  test("returns a new token", async () => {
    const entry = await new MoviesWatched({
      user_id: userId,
      movie_id: movieId,
    }).save();

    const response = await request(app)
      .delete(`/moviesWatched/${movieId}`)
      .set("Authorization", `Bearer ${token}`);

    const newTokenDecoded = JWT.decode(response.body.token, secret);
    const oldTokenDecoded = JWT.decode(token, secret);
    expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
  });
});

describe("DELETE, when token is missing", () => {
  test("responds with 401", async () => {
    const entry = await new MoviesWatched({
      user_id: userId,
      movie_id: movieId,
    }).save();

    const response = await request(app)
      .delete(`/moviesWatched/${movieId}`);

    expect(response.status).toEqual(401);
  });
});
