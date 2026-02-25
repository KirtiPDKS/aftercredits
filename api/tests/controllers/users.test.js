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
        .send({ email: "poppy@email.com", password: "ValidPassword1", username: "poppy" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ email: "scarconstt@email.com", password: "ValidPassword1", username: "scarconstt" });

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
        .send({ password: "ValidPassword1" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "ValidPassword1" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

   test("returns 400 if email is missing", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testuser",
          password: "ValidPassword1"
        });

      expect(response.statusCode).toBe(400);

      const users = await User.find();
      expect(users.length).toBe(0);
    });

    test("returns 400 if username is missing", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          email: "test@email.com",
          password: "ValidPassword1"
        });

      expect(response.statusCode).toBe(400);

      const users = await User.find();
      expect(users.length).toBe(0);
    });

    test("returns 400 if password is missing", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          email: "test@email.com",
          username: "testuser"
        });

      expect(response.statusCode).toBe(400);

      const users = await User.find();
      expect(users.length).toBe(0);
    });

    test("returns 400 if email already exists", async () => {
      await User.create({
        email: "duplicate@email.com",
        username: "existing",
        password: "ValidPassword1"
      });

      const response = await request(app)
        .post("/users")
        .send({
          email: "duplicate@email.com",
          username: "newuser",
          password: "ValidPassword1"
        });

      expect(response.statusCode).toBe(400);

      const users = await User.find();
      expect(users.length).toBe(1);
    });

    test("returns 400 if username already exists", async () => {
      await User.create({
        email: "duplicate@email.com",
        username: "existing",
        password: "ValidPassword1"
      });

      const response = await request(app)
        .post("/users")
        .send({
          email: "new@email.com",
          username: "existing",
          password: "ValidPassword1"
        });

      expect(response.statusCode).toBe(400);

      const users = await User.find();
      expect(users.length).toBe(1);
    });


  });
