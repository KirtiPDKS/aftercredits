import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../App.css";
import { getMovies } from "../../services/movies";
import Movies from "../../components/Movie";
import MovieModal from "../../components/MovieModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const currentYear = new Date().getFullYear();

export function BrowsingPage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState([0, currentYear]);
  const [rating, setRating] = useState([0, 5]);
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Redirect safely inside useEffect
    if (!token) {
      navigate("/login");
      return;
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
  }, [navigate]);

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      genre === "" ||
      movie.genre.toLowerCase().includes(genre.toLowerCase());

    const matchesYear =
      Number(year[0]) <= movie.releaseYear &&
      movie.releaseYear <= Number(year[1]);

    const matchesRating =
      Number(rating[0]) <= (movie.averageRating ?? 0) &&
      (movie.averageRating ?? 0) < Number(rating[1]);

    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.director.toLowerCase().includes(search.toLowerCase());

    return matchesGenre && matchesYear && matchesRating && matchesSearch;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "ratingDescending") {
      return b.averageRating - a.averageRating;
    }
    if (sortBy === "ratingAscending") {
      return a.averageRating - b.averageRating;
    }
    if (sortBy === "yearDescending") {
      return b.releaseYear - a.releaseYear;
    }
    if (sortBy === "yearAscending") {
      return a.releaseYear - b.releaseYear;
    }
    return 0;
  });

  return (
    <>
      <h2 className="mb-1 Title text-warning">Browse Movies</h2>
      <p className="text-body-warning">Search or Filter for Movies</p>

      <form>
        <div className="input-group mb-1">
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
          <select
            name="genre"
            className="form-select w-25 m-2"
            onChange={(e) => setGenre(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Genre
            </option>
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
            <option value="Comedy">Comedy</option>
            <option value="Historic">Historic</option>
          </select>

          <select
            name="year"
            className="form-select w-25 m-2"
            onChange={(e) => setYear(e.target.value.split(","))}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Year
            </option>
            <option value={`${0},${currentYear}`}>All time</option>
            <option value={`2020,${currentYear}`}>
              2020 - {currentYear}
            </option>
            <option value="2010,2019">2010 - 2019</option>
            <option value="2000,2009">2000 - 2009</option>
            <option value="1990,1999">1990 - 1999</option>
            <option value="1980,1989">1980 - 1989</option>
            <option value="1970,1979">1970 - 1979</option>
          </select>

          <select
            name="rating"
            className="form-select w-50 m-2"
            onChange={(e) => setRating(e.target.value.split(","))}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Average Rating
            </option>
            <option value="0,5">All</option>
            <option value="5,6">5</option>
            <option value="4,5">4 - 5</option>
            <option value="3,4">3 - 4</option>
            <option value="2,3">2 - 3</option>
            <option value="1,2">1 - 2</option>
            <option value="0,1">0 - 1</option>
          </select>

          <select
            className="form-select w-25 m-2"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="ratingDescending">Rating: High to Low</option>
            <option value="ratingAscending">Rating: Low to High</option>
            <option value="yearDescending">
              Release: Latest to Oldest
            </option>
            <option value="yearAscending">
              Release: Oldest to Latest
            </option>
          </select>

          <button
            id="resetFilter"
            type="button"
            className="btn btn-warning m-2 w-25"
            onClick={() => {
              setSearch("");
              setGenre("");
              setYear([0, currentYear]);
              setRating([0, 5]);
              setSortBy("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </form>

      <div className="container row" id="scroll">
        {sortedMovies.map((movie) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={movie._id}
          >
            <Link
              to={`/movies/${movie._id}`}
              className="text-decoration-none text-dark"
            >
              <Movies movie={movie} />
            </Link>
          </div>
        ))}
      </div>

      {showModal && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}