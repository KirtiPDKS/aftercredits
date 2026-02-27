import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watched, setWatched] = useState(false);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const [loadingWatched, setLoadingWatched] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch movie details and check status
  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchMovie() {
      try {
        // Get movie details
        const movieRes = await fetch(`${BACKEND_URL}/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const movieData = await movieRes.json();
        setMovie(movieData.movie);

        // Check watchlist
        const watchlistRes = await fetch(`${BACKEND_URL}/moviesToWatch`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const watchlistData = await watchlistRes.json();
        const isInWatchlist = watchlistData.movies.some(
          (entry) => entry.movie_id === id
        );
        setInWatchlist(isInWatchlist);

        // Check watched list
        const watchedRes = await fetch(`${BACKEND_URL}/moviesWatched/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const watchedData = await watchedRes.json();
        const isWatched =
          watchedData.movies?.some(
            (entry) =>
              entry.movie_id &&
              entry.movie_id._id &&
              entry.movie_id._id.toString() === id.toString()
          ) || false;

setWatched(isWatched);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  const displayOrUnknown = (value) =>
    value !== undefined && value !== null && value !== ""
      ? value
      : "Unknown";

  const handleWatchlistToggle = async () => {
    setLoadingWatchlist(true);
    const token = localStorage.getItem("token");

    try {
      const method = inWatchlist ? "DELETE" : "POST";
      const res = await fetch(`${BACKEND_URL}/moviesToWatch/${id}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);
      setInWatchlist(!inWatchlist);
    } catch (err) {
      console.error(err);
      alert("Error updating watchlist");
    } finally {
      setLoadingWatchlist(false);
    }
  };

  const handleWatchedToggle = async () => {
    setLoadingWatched(true);
    const token = localStorage.getItem("token");

    try {
      const method = watched ? "DELETE" : "POST";
      const res = await fetch(`${BACKEND_URL}/moviesWatched/${id}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);
      setWatched(!watched);
    } catch (err) {
      console.error(err);
      alert("Error updating watched list");
    } finally {
      setLoadingWatched(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={movie.image || "/placeholder-image.png"}
            alt={movie.title || "Movie poster"}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h2>{displayOrUnknown(movie.title)}</h2>
          <p>
            <strong>Genre:</strong> {displayOrUnknown(movie.genre)}
          </p>
          <p>
            <strong>Director:</strong> {displayOrUnknown(movie.director)}
          </p>
          <p>
            <strong>Release Year:</strong> {displayOrUnknown(movie.releaseYear)}
          </p>
          <p>{displayOrUnknown(movie.description)}</p>

          <div className="d-flex gap-3 mt-3">
            <button
              className={`btn btn-outline-primary ${
                inWatchlist ? "btn-primary text-white" : ""
              }`}
              onClick={handleWatchlistToggle}
              disabled={loadingWatchlist}
            >
              {loadingWatchlist
                ? "Updating..."
                : inWatchlist
                ? "In Watchlist (Click to remove)"
                : "Add to Watchlist"}
            </button>

            <button
              className={`btn btn-outline-success ${
                watched ? "btn-success text-white" : ""
              }`}
              onClick={handleWatchedToggle}
              disabled={loadingWatched}
            >
              {loadingWatched
                ? "Updating..."
                : watched
                ? "Watched (Click to remove)"
                : "Mark as Watched"}
            </button>

            <button className="btn btn-warning" disabled>
              Leave Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}