const request = require("supertest");
const app = require("../../app");
const Follower = require("../../models/follower");

require("../mongodb_helper");
const JWT = require("jsonwebtoken");
const User = require("../../models/user");

let token;
let userId;
let secondUserId;

beforeAll(async () => {
    await User.deleteMany({});
    const user = new User({
        email: "follower-test@test.com",
        username: "tester",
        password: "12345678",
    });

    await user.save();
    userId = user.id;

    const secondUser = new User({
        email: "second-user@test.com",
        username: "tester2",
        password: "12345678",
    });

    await secondUser.save();
    secondUserId = secondUser.id;

    token = JWT.sign(
        {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 600,
        },
        process.env.JWT_SECRET
    );
});

describe("/users followers system", () => {
    beforeEach(async () => {
        await Follower.deleteMany({});
    });

    describe("POST /users/:id/follow", () => {
        test("returns 201 and follows a user", async () => {
        const response = await request(app)
            .post(`/users/${secondUserId}/follow`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toEqual(201);
        expect(response.body.message).toEqual("successfully followed user");

        const followers = await Follower.find({});
        expect(followers.length).toEqual(1);
        expect(followers[0].follower_id.toString()).toEqual(userId);
        expect(followers[0].following_id.toString()).toEqual(secondUserId);
        });
    });

describe("DELETE /users/:id/unfollow", () => {
    test("returns 200 and unfollows a user", async () => {
    const follow = new Follower({
        follower_id: userId,
        following_id: secondUserId,
    });

    await follow.save();

    const response = await request(app)
        .delete(`/users/${secondUserId}/unfollow`)
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("successfully unfollowed user");

    const followers = await Follower.find({});
    expect(followers.length).toEqual(0);
    });
});

describe("GET /users/me/followers", () => {
test("returns the current user's followers", async () => {
    const follower = new Follower({
    follower_id: secondUserId,
    following_id: userId,
    });

    await follower.save();

    const response = await request(app)
    .get("/users/me/followers")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.followers.length).toEqual(1);
    expect(response.body.followers[0].follower_id._id.toString()).toEqual(secondUserId);
});
});

describe("GET /users/me/following", () => {
test("returns users the current user is following", async () => {
    const following = new Follower({
    follower_id: userId,
    following_id: secondUserId,
    });

    await following.save();

    const response = await request(app)
    .get("/users/me/following")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.following.length).toEqual(1);
    expect(response.body.following[0].following_id._id.toString()).toEqual(secondUserId);
});
});

describe("GET /users/:id/followers", () => {
test("returns followers of a specific user", async () => {
    const follower = new Follower({
    follower_id: userId,
    following_id: secondUserId,
    });

    await follower.save();

    const response = await request(app)
    .get(`/users/${secondUserId}/followers`)
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.followers.length).toEqual(1);
});
});

describe("GET /users/:id/following", () => {
test("returns users a specific user is following", async () => {
    const following = new Follower({
    follower_id: secondUserId,
    following_id: userId,
    });

    await following.save();

    const response = await request(app)
    .get(`/users/${secondUserId}/following`)
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.following.length).toEqual(1);
});
});
});