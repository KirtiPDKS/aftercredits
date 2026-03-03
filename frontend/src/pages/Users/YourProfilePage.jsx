import { useEffect,useState} from "react";
import { useNavigate} from "react-router-dom"
import { getCurrentUser} from "../../services/users";
import { getMyWatchedMovies } from "../../services/moviesWatched";
import { Link } from "react-router-dom";
import Movies from "../../components/Movie";

export function YourProfilePage() {
const navigate = useNavigate();
const [user, setUser] = useState(null)
const [watchedMovies, setWatchedMovies] = useState([])

    useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/login")
        return;
    }

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

        getMyWatchedMovies(token)
        .then((data) => {
            setWatchedMovies(data.movies);
        })
        .catch((err) => {
            console.error(err);
        });
    },[navigate]);



if (!user) return <p>Loading user...</p>

return (
  <div className="container mt-4">

    {/* Profile Header */}
    <div className="card shadow-sm mb-4 p-4 text-center">
      <h2 className="mb-2">{user.username}</h2>
      {user.image && (
        <img
          src={user.image}
          alt="Profile"
          className="rounded-circle mx-auto"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
      )}
    </div>

    {/* Movies Watched Section */}
    <div className="card shadow-sm mb-4 p-4">
      <h4 className="mb-3">Movies Watched</h4>

      {watchedMovies.length === 0 ? (
        <p className="text-muted">No movies watched yet.</p>
      ) : (
        <div className="row">
          {watchedMovies.map((movie) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={movie.movie_id._id}
            >
              <Link
                to={`/movies/${movie.movie_id._id}`}
                className="text-decoration-none text-dark"
              >
                <Movies movie={movie.movie_id} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Reviews Section */}
    <div className="card shadow-sm mb-4 p-4">
      <h4 className="mb-3">Reviews</h4>

      {watchedMovies.filter((movie) => movie.review).length === 0 ? (
        <p className="text-muted">No reviews written yet.</p>
      ) : (
        watchedMovies
          .filter((movie) => movie.review)
          .map((movie) => (
            <div key={movie._id} className="border-bottom pb-3 mb-3">
              <h6 className="mb-1">{movie.movie_id.title}</h6>
              <p className="mb-1">{movie.review}</p>
              {movie.rating && (
                <small className="text-muted">
                  Rating:{" "}
                  {Number.isInteger(movie.rating)
                    ? movie.rating
                    : movie.rating.toFixed(1)}{" "}
                  / 5
                </small>
              )}
            </div>
          ))
      )}
    </div>

    {/* Edit Button (only keep this in YourProfilePage) */}
    {user && (
      <div className="text-center mb-5">
        <Link to="/users/myprofile/edit">
          <button className="btn btn-warning px-4">
            Edit Account
          </button>
        </Link>
      </div>
    )}

  </div>
);
}