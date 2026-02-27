const request = require("supertest");
const JWT = require("jsonwebtoken")

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      sub: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
    },
    secret
  );
}

let token;
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

    test("returns all users GET /users/all", async () => {
    await User.create({
      email: "user1@email.com",
      username: "user1",
      password: "ValidPassword1"
    });

    await User.create({
      email: "user2@email.com",
      username: "user2",
      password: "ValidPassword1"
    });

    const response = await request(app)
      .get("/users/all");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  });

//Separated out the tests that need tokens and ones that don't
describe("/users (tests that need tokens) ", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = await User.create({
      email: "current@test.com",
      username: "testuser",
      password: "12345678",
    });

    await User.create({
      email: "profile@test.com",
      username: "profileuser",
      password: "12345678",
    });

    token = createToken(user.id);
});
    test("GET /users/me (getting current users) returns the current user without password", async () => {
    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe("current@test.com");
    expect(response.body.user.username).toBe("testuser");
    expect(response.body.user.password).toBeUndefined();
  });

  test("returns 404 for /GET /users/me if user doesn't exist", async () => {
    await User.deleteMany({}); // remove the user

    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  test("returns a user by username without password", async () => {
    const response = await request(app)
      .get("/users/profileuser")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.username).toBe("profileuser");
    expect(response.body.user.password).toBeUndefined();
  });

  test("returns 404 if username does not exist", async () => {
    const response = await request(app)
      .get("/users/nonexistent")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User doesn't exist. Unable to get user information");
  });

});