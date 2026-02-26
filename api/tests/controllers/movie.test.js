const request = require("supertest");
const app = require("../../app");
const Movie = require("../../models/movies");

require("../mongodb_helper");
const JWT = require("jsonwebtoken");
const User = require("../../models/user");

let token;
let userId;

beforeAll(async () => {
  const user = new User({
    email: "movie-test@test.com",
    username: "tester",
    password: "12345678",
  });
  await user.save();
  userId = user.id;

  token = JWT.sign(
    {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 600,
    },
    process.env.JWT_SECRET
  );
});

describe("/movies", () => {
  beforeEach(async () => {
    await Movie.deleteMany({});
  });

  describe("GET /movies/:id", () => {
    test("returns 200 and the correct movie", async () => {
      const movie = new Movie({
        title: "Inception",
        genre: "Sci-Fi",
        releaseYear: 2010,
        description: "A mind-bending thriller",
        director: "Christopher Nolan",
      });

      await movie.save();

      const response = await request(app)
        .get(`/movies/${movie.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body.movie.title).toEqual("Inception");
      expect(response.body.movie.releaseYear).toEqual(2010);
      expect(response.body.movie.genre).toEqual("Sci-Fi");
      expect(response.body.movie.director).toEqual("Christopher Nolan");
    });

    test("returns 404 if movie does not exist", async () => {
      const fakeId = "507f1f77bcf86cd799439011";

      const response = await request(app)
        .get(`/movies/${fakeId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(404);
    });
  });
});