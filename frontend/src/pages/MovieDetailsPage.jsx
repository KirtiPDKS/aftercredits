import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReviewCard } from "../components/ReviewCard";
import MovieModal from "../components/MovieModal"
import { getCurrentUser} from "../services/users";
import "../App.css"


export function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watched, setWatched] = useState(false);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const [loadingWatched, setLoadingWatched] = useState(false);
  const [showModal, setShowModal] = useState(false); // comments card popout hidden to start with
  const [selectedMovie, setSelectedMovie] = useState(null) //starting state is null, no movies selected
  const [watchedEntry, setWatchedEntry] = useState(null);
  const [otherReviews, setOtherReviews] = useState([]);
  const [loadingOtherReviews, setLoadingOtherReviews] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null)
  // Fetch movie details and check status
  useEffect(() => {
    const token = localStorage.getItem("token");

  getCurrentUser(token)
      .then((data) => {
          setUser(data.user);
          if(data.token){
          localStorage.setItem("token", data.token);
          }
      })
      .catch((err) => {
          console.error(err);
      });

    async function fetchMovie() {
      try {
        // Get movie details
        const movieRes = await fetch(`${BACKEND_URL}/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const movieData = await movieRes.json();
        setMovie(movieData.movie);

        //get movie reviews from other users

        const reviewsRes = await fetch(`${BACKEND_URL}/moviesWatched/by-movie/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const otherData = await reviewsRes.json();
        if (otherData.reviews) setOtherReviews(otherData.reviews);
        setLoadingOtherReviews(false);


        // Check watchlist
        const watchlistRes = await fetch(`${BACKEND_URL}/moviesToWatch`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const watchlistData = await watchlistRes.json();
        const isInWatchlist = watchlistData.movies.some((entry) =>
          entry.movie_id?.toString() === id.toString() ||
          entry.movie_id?._id?.toString() === id.toString()
        );
        setInWatchlist(isInWatchlist);

        // Check watched list
        const watchedRes = await fetch(`${BACKEND_URL}/moviesWatched/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const watchedData = await watchedRes.json();
        const matchingEntry = watchedData.movies?.find(
          (entry) =>
            entry.movie_id?._id?.toString() === id.toString() ||
            entry.movie_id?.toString?.() === id.toString()
        );

        setWatched(!!matchingEntry);
        setWatchedEntry(matchingEntry || null);

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

      const newWatchedState = !watched;
      setWatched(newWatchedState);

      if (!newWatchedState) {
        setWatchedEntry(null);
      }

    } catch (err) {
      console.error(err);
      alert("Error updating watched list");
    } finally {
      setLoadingWatched(false);
      setInWatchlist(false);
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
          <p>
            <strong>Average Rating:</strong> {displayOrUnknown(Number(movie.averageRating?.toFixed(1)))} / 5
          </p>
          <p>{displayOrUnknown(movie.description)}</p>


          {/* button selection */}

          <div className="d-flex gap-3 mt-3">
            <button
              className={`btn btn-outline-primary ${inWatchlist ? "btn-primary text-white" : ""
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
              className={`btn btn-outline-success ${watched ? "btn-success text-white" : ""
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

            <button
              className="btn btn-warning"
              key={movie.id}
              onClick={() => { setSelectedMovie(movie); setShowModal(true); }}
            >{watchedEntry?.review ? "Edit Review" : "Leave Review"}

            </button>
          </div>
          <div className="mt-3" id="scroll-reveiws">

          {/* REVIEW CARDS - LOGGED IN USER + OTHER USERS  */}

          {/*Logic for "Your Review" card*/}

          {watchedEntry && watchedEntry.rating && (
            <>
              <ReviewCard
                watchedEntry={watchedEntry}
                heading="Your Review" 
                user={user}
                margin={0}
                />
            </>
          )}


          {/* What others are saying - have made this always visible */}
          <div className="card mt-4 p-3">
            <h5>What others thought of this film </h5>
            {!watchedEntry || !watchedEntry.review ? (
              <p className="text-muted mb-0">
                🔓 Unlock what other users are saying by leaving your own review! <a href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedMovie(movie);
                    setShowModal(true);
                  }}
                >Leave a review</a>
              </p>

            ) : (
              <>
                {loadingOtherReviews ? (
                  <p className="text-muted mb-0">Loading other reviews...</p>
                ) : otherReviews.length === 0 ? (
                  <p className="text-muted mb-0">No other reviews yet.</p>
                ) : (
                  otherReviews.map((entry) => (
                    <ReviewCard
                      key={entry._id}
                      watchedEntry={entry}
                      label={entry.user_id?.username}
                      user={entry.user_id}
                      margin={3}
                    />
                  ))
                )}
              </>
            )}



            {showModal && selectedMovie &&
              (<MovieModal
                key={watchedEntry?._id ?? 'new'} // adding key to avoid timing issues with the modal component mounting and the details page loading i.e. if user clicks button before fetch from backend with prev review/rating data has happened it will force the modal to update when key is updated (once watchedEntry becomes available)
                existingReview={watchedEntry?.review ?? ''}
                existingRating={watchedEntry?.rating ?? 0}
                movie={selectedMovie}
                onClose={() => setShowModal(false)}
                onSaved={(entry) => {
                  setShowModal(false);
                  setWatched(true);
                  setWatchedEntry(entry);
                  setInWatchlist(false);
                }}

              />)}
          </div>
          </div>

        </div>
      </div>
    </div>
  )
}
