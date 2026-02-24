const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Movie = require("../../models/movies");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      sub: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
}

let token;
describe("/movies", () => {
  beforeAll(async () => {
    const user = new User({
      email: "post-test@test.com",
      username: "post-test",
      password: "12345678",
    });
    await user.save();
    await Movie.deleteMany({});
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Movie.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/movies")
        .set("Authorization", `Bearer ${token}`)
   
      expect(response.status).toEqual(201);
    });

    test("creates a new movie", async () => {
      await request(app)
        .post("/movies")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Training Day" });

      const movies = await Movie.find();
      expect(movies.length).toEqual(1);
      expect(movies[0].title).toEqual("Training Day");
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/movies")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Training Day" });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/movies")
        .send({ title: "Training Day" });

      expect(response.status).toEqual(401);
    });

    test("a movie is not created", async () => {
      const response = await request(app)
        .post("/movies")
        .send({ title: "Training Day" });

      const movies = await Movie.find();
      expect(movies.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/movies")
        .send({ title: "Training Day" });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const movie1 = new Movie({ title: "Marty Supreme" });
      const movie2 = new Movie({ title: "Highest 2 Lowest" });
      await movie1.save();
      await movie2.save();

      const response = await request(app)
        .get("/movies")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns every movie in the collection", async () => {
      const movie1 = new Movie({ title: "Marty Supreme" });
      const movie2 = new Movie({ title: "Highest 2 Lowest" });
      await movie1.save();
      await movie2.save();

      const response = await request(app)
        .get("/movies")
        .set("Authorization", `Bearer ${token}`);

      const movies = response.body.movies;
      const firstMovie = movies[0];
      const secondMovie = movies[1];

      expect(firstMovie.title).toEqual("Marty Supreme");
      expect(secondMovie.title).toEqual("Highest 2 Lowest");
    });

    test("returns a new token", async () => {
      const movie1 = new Movie({ title: "Marty Supreme" });
      const movie2 = new Movie({ title: "Highest 2 Lowest" });
      await movie1.save();
      await movie2.save();

      const response = await request(app)
        .get("/movies")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const movie1 = new Movie({ title: "Marty Supreme" });
      const movie2 = new Movie({ title: "Highest 2 Lowest" });
      await movie1.save();
      await movie2.save();

      const response = await request(app).get("/movies");

      expect(response.status).toEqual(401);
    });

    test("returns no movies", async () => {
      const movie1 = new Movie({ title: "Marty Supreme" });
      const movie2 = new Movie({ title: "Highest 2 Lowest" });
      await movie1.save();
      await movie2.save();

      const response = await request(app).get("/movies");

      expect(response.body.movies).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const movie1 = new Movie({ title: "Marty Supreme" });
      const movie2 = new Movie({ title: "Highest 2 Lowest" });
      await movie1.save();
      await movie2.save();

      const response = await request(app).get("/movies");

      expect(response.body.token).toEqual(undefined);
    });
  });
});
