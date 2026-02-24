import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getMovies } from "../../services/movies";
import LogoutButton from "../../components/LogoutButton";
import Movies from "../../components/Movie";

export function FeedPage() {
  const [movies, setMovies] = useState([]);
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
      <h2>Movies</h2>
      <p>Browse through all films.</p>
      <div className="movie-feed" role="movie-feed">
        Writing extra content 
        {movies.map((movie) => (
          <Movies movie={movie} key={movie._id} />
        ))}
      </div>
      <LogoutButton />
    </>
  );
}
