import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import {
    followUser,
    unfollowUser,
    getUsersFollowers,
    getUsersFollowing,
    getMyFollowers,
    getMyFollowing,
} from "../../src/services/followers";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Enable fetch mocks
createFetchMock(vi).enableMocks();

describe("follow service", () => {
    const testToken = "testToken";
    const testUserId = "12345";

afterEach(() => {
fetch.resetMocks();
});

describe("followUser", () => {
    test("includes a token in the request", async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: "success" }), { status: 200 });

        await followUser(testUserId, testToken);

        const [url, options] = fetch.mock.lastCall;
        expect(url).toEqual(`${BACKEND_URL}/users/${testUserId}/follow`);
        expect(options.method).toEqual("POST");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${testToken}`);
});

    test("rejects if response is not ok", async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: "Cannot follow" }), { status: 400 });

        await expect(followUser(testUserId, testToken)).rejects.toThrow("Cannot follow");
    });
});

describe("unfollowUser", () => {
    test("includes a token in the request", async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: "success" }), { status: 200 });

        await unfollowUser(testUserId, testToken);

        const [url, options] = fetch.mock.lastCall;
        expect(url).toEqual(`${BACKEND_URL}/users/${testUserId}/unfollow`);
        expect(options.method).toEqual("DELETE");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${testToken}`);
});

test("rejects if response is not ok", async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: "Cannot unfollow" }), { status: 400 });

    await expect(unfollowUser(testUserId, testToken)).rejects.toThrow("Cannot unfollow");
});
});

describe("getUsersFollowers", () => {
    test("includes token and calls correct endpoint", async () => {
        fetch.mockResponseOnce(JSON.stringify({ followers: [] }), { status: 200 });

        await getUsersFollowers(testUserId, testToken);

        const [url, options] = fetch.mock.lastCall;
        expect(url).toEqual(`${BACKEND_URL}/users/${testUserId}/followers`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${testToken}`);
});
});

describe("getUsersFollowing", () => {
    test("includes token and calls correct endpoint", async () => {
        fetch.mockResponseOnce(JSON.stringify({ following: [] }), { status: 200 });

        await getUsersFollowing(testUserId, testToken);

        const [url, options] = fetch.mock.lastCall;
        expect(url).toEqual(`${BACKEND_URL}/users/${testUserId}/following`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${testToken}`);
});
});

describe("getMyFollowers", () => {
    test("includes token and calls correct endpoint", async () => {
        fetch.mockResponseOnce(JSON.stringify({ followers: [] }), { status: 200 });

        await getMyFollowers(testToken);

        const [url, options] = fetch.mock.lastCall;
        expect(url).toEqual(`${BACKEND_URL}/users/me/followers`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${testToken}`);
});
});

describe("getMyFollowing", () => {
    test("includes token and calls correct endpoint", async () => {
        fetch.mockResponseOnce(JSON.stringify({ following: [] }), { status: 200 });

        await getMyFollowing(testToken);

        const [url, options] = fetch.mock.lastCall;
        expect(url).toEqual(`${BACKEND_URL}/users/me/following`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual(`Bearer ${testToken}`);
    });
    }); 
});