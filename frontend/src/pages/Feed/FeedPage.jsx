import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getMovies } from "../../services/movies";
import LogoutButton from "../../components/LogoutButton";
import Movies from "../../components/Movie";
import MovieModal from "../../components/MovieModal"

export function FeedPage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null) //starting state is null, no movies selected
  const [showModal, setShowModal] = useState(false); // comments card popout hidden to start with
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getMovies(token)
        .then((data) => {
          setMovies(data.movies);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      <h2 className="mb-1">Movies</h2>
      <p className="text-body-secondary">Browse through all films.</p>
      <div className="container row" >
        {movies.map((movie) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          key={movie._id}> 
            <Link to={`/movies/${movie._id}`} className="text-decoration-none text-dark">
              <Movies movie={movie} />
            </Link>
          </div> 
        ))}
      </div>
      <LogoutButton />
{/* putting this modal outside the loop as only one version of this should be shown at the time (the one for the movie clicked) */}
      {showModal && selectedMovie && ( //both values from the useState hooks need to be true for the modal to render correctly. 
        <MovieModal    // passing 2 props to MovieModal
          movie={selectedMovie}
          onClose={() => setShowModal(false)} // need to pass this onClose prop so movieModal knows how to close itself (see setTimeout) as the state of showModal is managed here on feedback
        />
        )}
    </>
  );
}
