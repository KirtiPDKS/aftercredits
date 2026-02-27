import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import {getUser, getAllUsers, getCurrentUser } from "../../src/services/users";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch
createFetchMock(vi).enableMocks();

describe("users service", () => {

    // =========================
    // getUser
    // =========================
    describe("getUser", () => {
        test("includes token and username in request", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ user: { username: "john" } }),
            { status: 200 }
        );

        await getUser("john", "testToken");

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/users/john`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
        });

        test("returns user data when status is 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ user: { username: "john" } }),
            { status: 200 }
        );

        const result = await getUser("john", "testToken");

        expect(result.user.username).toEqual("john");
        });

        test("rejects if response status is not 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ message: "Error" }),
            { status: 404 }
        );

        try {
            await getUser("john", "testToken");
        } catch (err) {
            expect(err.message).toEqual("Unable to get user data");
        }
        });
    });


    // =========================
    // getAllUsers
    // =========================
    describe("getAllUsers", () => {
        test("includes token in request", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ users: [] }),
            { status: 200 }
        );

        await getAllUsers("testToken");

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/users/all`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
        });

        test("returns users when status is 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ users: [{ username: "john" }] }),
            { status: 200 }
        );

        const result = await getAllUsers("testToken");

        expect(result.users.length).toEqual(1);
        });

        test("rejects if response status is not 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ message: "Error" }),
            { status: 500 }
        );

        try {
            await getAllUsers("testToken");
        } catch (err) {
            expect(err.message).toEqual("Unable to get users");
        }
        });
    });


    // =========================
    // getCurrentUser
    // =========================
    describe("getCurrentUser", () => {
        test("includes token in request", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ user: { username: "john" } }),
            { status: 200 }
        );

        await getCurrentUser("testToken");

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/users/me`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
        });

        test("returns current user when status is 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ user: { username: "john" } }),
            { status: 200 }
        );

        const result = await getCurrentUser("testToken");

        expect(result.user.username).toEqual("john");
        });

        test("rejects if response status is not 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ message: "Error" }),
            { status: 401 }
        );

        try {
            await getCurrentUser("testToken");
        } catch (err) {
            expect(err.message).toEqual("Unable to get user");
        }
        });
    });

});