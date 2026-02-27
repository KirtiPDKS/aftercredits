import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css"
import { getMovies } from "../../services/movies";
import Movies from "../../components/Movie";
import MovieModal from "../../components/MovieModal"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear()

export function BrowsingPage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null) //starting state is null, no movies selected
  const [showModal, setShowModal] = useState(false); // comments card popout hidden to start with
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState([0, currentYear]);
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

  const filteredMovies = movies.filter(
  (movie) => {
    if(genre === ""){
      return (Number(year[0]) <= movie.releaseYear && movie.releaseYear <= Number(year[1])) && (movie.title.toLowerCase().includes(search.toLowerCase()) || movie.director.toLowerCase().includes(search.toLowerCase()))
    } else{
      return movie.genre.toLowerCase().includes(genre.toLowerCase()) && (Number(year[0]) <= movie.releaseYear && movie.releaseYear <= Number(year[1])) && (movie.title.toLowerCase().includes(search.toLowerCase()) || movie.director.toLowerCase().includes(search.toLowerCase()))
    }
  }
    );

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      <h2 className="mb-1 Title text-warning">Browse Movies</h2>
      <p className="text-body-warning">Search or Filter for Movies</p>
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text">Search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            aria-label="Search"
            placeholder="Search by Title or Director"
            />
        </div>
        <div className="d-inline-flex p-2">
        <select name="genre" className="form-select w-25 m-2" aria-label="Default select example" onChange={(e) => setGenre(Array(e.target.value))}>
          <option selected disabled hidden>Genre</option>
          <option value="">All</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-fi">Sci-fi</option>
          <option value="Thriller">Thriller</option>
          <option value="Horror">Horror</option>
          <option value="Biographical">Biographical</option>
          <option value="Romantic">Romantic</option>
          <option value="Action">Action</option>
          <option value="Superhero">Superhero</option>
          <option value="Psychological">Psychological</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
        </select>
        <select name="year" className="form-select w-25  m-2" aria-label="Default select example" onChange={(e) => setYear(e.target.value.split(','))}>
          <option selected disabled hidden>Year</option>
          <option value={[0,currentYear]}>All time</option>
          <option value={[2020,currentYear]}>2020 - {currentYear}</option>
          <option value={[2010,2019]}>2010 - 2019</option>
          <option value={[2000,2009]}>2000 - 2009</option>
          <option value={[1990,1999]}>1990 - 1999</option>
          <option value={[1980,1989]}>1980 - 1989</option>
          <option value={[1970,1979]}>1970 - 1979</option>
        </select>
        <button class="btn btn-warning m-2">Clear Filters</button>
        </div>
      </form>
      <div className="container row" id="scroll">
        {filteredMovies.map((movie) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          key={movie._id}> 
            <Link to={`/movies/${movie._id}`} className="text-decoration-none text-dark">
              <Movies movie={movie} />
            </Link>
          </div> 
        ))}
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
