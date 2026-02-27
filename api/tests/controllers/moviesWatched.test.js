const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");
const Movie = require("../../models/movies");
const MoviesWatched = require("../../models/moviesWatched");
const MoviesToWatch = require("../../models/moviesToWatch");

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
    await MoviesToWatch.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Movie.deleteMany({});
  });

  // =========================
  // POST /moviesWatched
  // =========================

  describe("POST /moviesWatched", () => {
    test("responds with 201 when token is valid", async () => {
      const response = await request(app)
        .post("/moviesWatched")
        .set("Authorization", `Bearer ${token}`)
        .send({ movie_id: movieId });

      expect(response.status).toEqual(201);
    });

    test("creates a new watched movie", async () => {
      await request(app)
        .post("/moviesWatched")
        .set("Authorization", `Bearer ${token}`)
        .send({ movie_id: movieId });

      const entries = await MoviesWatched.find();
      expect(entries.length).toEqual(1);
      expect(entries[0].movie_id.toString()).toEqual(movieId.toString());
      expect(entries[0].user_id.toString()).toEqual(userId.toString());
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .post("/moviesWatched")
        .set("Authorization", `Bearer ${token}`)
        .send({ movie_id: movieId });

      const newTokenDecoded = JWT.decode(response.body.token);
      const oldTokenDecoded = JWT.decode(token);

      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });

    test("responds with 401 if token missing", async () => {
      const response = await request(app)
        .post("/moviesWatched")
        .send({ movie_id: movieId });

      expect(response.status).toEqual(401);
    });
  });

  // =========================
  // POST /moviesWatched/:movieId
  // =========================

  describe("POST /moviesWatched/:movieId (markAsWatched)", () => {
    test("moves movie from to-watch to watched", async () => {
      await MoviesToWatch.create({
        user_id: userId,
        movie_id: movieId,
      });

      const response = await request(app)
        .post(`/moviesWatched/${movieId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);

      const toWatchEntries = await MoviesToWatch.find();
      const watchedEntries = await MoviesWatched.find();

      expect(toWatchEntries.length).toEqual(0);
      expect(watchedEntries.length).toEqual(1);
    });

    test("returns new token", async () => {
      const response = await request(app)
        .post(`/moviesWatched/${movieId}`)
        .set("Authorization", `Bearer ${token}`);

      const newTokenDecoded = JWT.decode(response.body.token);
      const oldTokenDecoded = JWT.decode(token);

      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });

    test("responds with 401 if token missing", async () => {
      const response = await request(app)
        .post(`/moviesWatched/${movieId}`);

      expect(response.status).toEqual(401);
    });
  });

  // =========================
  // GET /moviesWatched/me
  // =========================

  describe("GET /moviesWatched/me", () => {
    test("returns watched movies for logged in user", async () => {
      await MoviesWatched.create({
        user_id: userId,
        movie_id: movieId,
      });

      const response = await request(app)
        .get("/moviesWatched/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body.movies.length).toEqual(1);
    });

    test("responds with 401 if token missing", async () => {
      const response = await request(app).get("/moviesWatched/me");
      expect(response.status).toEqual(401);
    });
  });

  // =========================
  // GET /moviesWatched/name/:username
  // =========================

describe("GET /moviesWatched/name/:username", () => {
  test("returns watched movies by username when logged in", async () => {
    await MoviesWatched.create({
      user_id: userId,
      movie_id: movieId,
    });

    const response = await request(app)
      .get("/moviesWatched/name/movie-addict")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.movies.length).toEqual(1);
  });


  test("responds with 404 if user not found", async () => {
    const response = await request(app)
      .get("/moviesWatched/name/unknown-user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });

  test("responds with 401 if token missing", async () => {
    const response = await request(app)
      .get("/moviesWatched/name/movie-addict");
    
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
});