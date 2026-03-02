const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function addWatchedMovie(movie_id, review, rating, token) {
  const response = await fetch(
    `${BACKEND_URL}/moviesWatched/${movie_id}/review`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ review, rating }),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Failed to save review.");
  }

  return json.entry;
}

export async function getUserWatchedMovies(username, token) {

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/moviesWatched/name/${username}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch movies");
  }

  const data = await response.json();
  return data;
}

export async function getMyWatchedMovies(token) {

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/moviesWatched/me`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch movies");
  }

  const data = await response.json();
  return data;
}