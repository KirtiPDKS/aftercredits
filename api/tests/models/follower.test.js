require("../mongodb_helper");
const mongoose = require("mongoose");
const Follower = require("../../models/follower");

describe("Follower model", () => {
  beforeEach(async () => {
    await Follower.deleteMany({});
  });

  it("has a follower_id and following_id", () => {
    const followerId = new mongoose.Types.ObjectId();
    const followingId = new mongoose.Types.ObjectId();

    const entry = new Follower({
      follower_id: followerId,
      following_id: followingId
    });

    expect(entry.follower_id.toString()).toEqual(followerId.toString());
    expect(entry.following_id.toString()).toEqual(followingId.toString());
  });

  it("requires a follower_id", async () => {
    const followingId = new mongoose.Types.ObjectId();
    const entry = new Follower({ following_id: followingId });

    let error;
    try {
      await entry.save();
    } catch (err) {
      error = err;
    }

    expect(error.errors["follower_id"]).toBeDefined();
  });

  it("requires a following_id", async () => {
    const followerId = new mongoose.Types.ObjectId();
    const entry = new Follower({ follower_id: followerId });

    let error;
    try {
      await entry.save();
    } catch (err) {
      error = err;
    }

    expect(error.errors["following_id"]).toBeDefined();
  });

  // it("cannot follow yourself", async () => {
  //   const userId = new mongoose.Types.ObjectId();

  //   const entry = new Follower({
  //     follower_id: userId,
  //     following_id: userId
  //   });

  //   let error;
  //   try {
  //     await entry.save();
  //   } catch (err) {
  //     error = err;
  //   }

  //   expect(error.errors["following_id"]).toBeDefined();
  // });

  it("enforces unique follower + following combination", async () => {
    const followerId = new mongoose.Types.ObjectId();
    const followingId = new mongoose.Types.ObjectId();

    await new Follower({
      follower_id: followerId,
      following_id: followingId
    }).save();

    let error;
    try {
      await new Follower({
        follower_id: followerId,
        following_id: followingId
      }).save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });

  it("can list all entries", async () => {
    const entries = await Follower.find();
    expect(entries.length).toEqual(0);
  });

  it("can save a follower relationship", async () => {
    const followerId = new mongoose.Types.ObjectId();
    const followingId = new mongoose.Types.ObjectId();

    await new Follower({
      follower_id: followerId,
      following_id: followingId
    }).save();

    const entries = await Follower.find();

    expect(entries.length).toEqual(1);
    expect(entries[0].follower_id.toString()).toEqual(followerId.toString());
    expect(entries[0].following_id.toString()).toEqual(followingId.toString());
  });
});