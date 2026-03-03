import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getMovies } from "../../services/movies";
import LogoutButton from "../../components/LogoutButton";
import Movies from "../../components/Movie";
import MovieModal from "../../components/MovieModal"
import { getWatchList } from "../../services/moviesToWatch";

export function FeedPage() {
  const [movies, setMovies] = useState([]);
  const [moviesToWatch, setMoviesToWatch] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null) //starting state is null, no movies selected
  const [showModal, setShowModal] = useState(false); // comments card popout hidden to start with
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token){
      navigate("/login");
      return
    }
    getMovies(token)
      .then((data) => {
        setMovies(data.movies);
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });

    getWatchList(token).then((data)=>{
      setMoviesToWatch(data.movies);
      console.log(data.movies)
    }).catch((err)=>{
      console.error(err)
    })
  }, [navigate]);

  return (
    <>
      <h2 className="mb-1">Movies</h2>
      <p className="text-body-secondary">Browse through all films.</p>
      <div className="container  mb-4">
        <div className="d-flex overflow-x-auto gap-3 align-items-stretch">
        {movies.map((movie) => (
          <div className="flex-shrink-0 d-flex"
          style={{height:"300px"}}
          key={movie._id}> 
            <Link to={`/movies/${movie._id}`} className="text-decoration-none text-dark h-100 d-flex flex-column">
              <Movies movie={movie} />
            </Link>
          </div>  
        ))}
      </div>
      </div>

      <h2>Watch List</h2> 
      <p>Films to watch </p>

    <div className="container mb-4 ">
        <div className="d-flex overflow-x-auto gap-3 align-items-stretch">
        {moviesToWatch.filter((movie) => movie.movie_id).map((movie) => (
          <div className="flex-shrink-0 d-flex"
          style={{height:"300px"}}
          key={movie._id}> 
            <Link to={`/movies/${movie.movie_id._id}`} className="text-decoration-none text-dark h-100 d-flex flex-column">
              <Movies movie={movie.movie_id} />
            </Link>
          </div>  
        ))}
      </div>
      </div>

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
