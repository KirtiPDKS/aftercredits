const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email, username and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "1234", username: "poppy" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ email: "scarconstt@email.com", password: "1234", username: "scarconstt" });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
      expect(newUser.username).toEqual("scarconstt");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "1234" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});

describe("/users/:username", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /users/:username", () => {

    test("returns 200 + user information on successful request", async () => {
      // Create test user
      const user = await User.create({
        username: "testuser",
        email: "test@test.com",
        password: "hashedpassword123",
      });

      const response = await request(app)
        .get("/users/testuser");

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body.user.username).toBe("testuser");
      expect(response.body.user.email).toBe("test@test.com");
    });


    test("password isn't returned with user information", async () => {
      await User.create({
        username: "testuser",
        email: "test@test.com",
        password: "hashedpassword123",
      });

      const response = await request(app)
        .get("/users/testuser");

      expect(response.statusCode).toBe(200);
      expect(response.body.user.password).toBeUndefined();
    });


    test("returns 404 if user does not exist", async () => {
      const response = await request(app)
        .get("/users/nonexistentuser");

      expect(response.statusCode).toBe(404);
    });

  });
});