const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function followUser(userId, token) {
    const requestOptions = {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${userId}/follow`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to unfollow");
    }

    return data;
}

export async function unfollowUser(userId, token) {
    const requestOptions = {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${userId}/unfollow`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to unfollow");
    }

    return data;
}

export async function getUsersFollowers(userId, token) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${userId}/followers`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to get followers");
    }

    return data;
}

export async function getUsersFollowing(userId, token) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${userId}/following`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to get following");
    }

    return data;
}

export async function getMyFollowers(token) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/me/followers`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to get followers");
    }

    return data;
}

export async function getMyFollowing(token) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/me/following`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to get users following");
    }

    return data;
}

