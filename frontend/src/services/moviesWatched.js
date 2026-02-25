const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function addWatchedMovie(movie_id, review, rating, token) {
  const response = await fetch(`${BACKEND_URL}/moviesWatched`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movie_id, review, rating }),
  });

  if (!response.ok) throw new Error("Failed to save watched movie, try again.");

  const json = await response.json();
  localStorage.setItem("token", json.token);
  return json;
}