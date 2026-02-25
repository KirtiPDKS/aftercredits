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
      <h2 className="mb-1">Movies</h2>
      <p className="text-body-secondary">Browse through all films.</p>
      <div className="container row" >
        {movies.map((movie) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          key={movie._id}> 
          <Movies movie={movie} />
          </div> 
        ))}
      </div>
      <LogoutButton />
    </>
  );
}
