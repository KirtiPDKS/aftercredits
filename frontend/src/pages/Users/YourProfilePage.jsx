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

return <>
<h2>Welcome to the userspage</h2>
<h2>{user.username}</h2>
<div>{user.image}</div>

<h3>Movies Watched</h3>
<div className="container row" >
    {watchedMovies.map((movie) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        key={movie.movie_id._id}> 
        <Link to={`/movies/${movie.movie_id._id}`} className="text-decoration-none text-dark">
            <Movies movie={movie.movie_id} />
        </Link>
        </div> 
    ))}
    </div>

<h3>Reviews</h3>
<div>{watchedMovies.map((movie) => (
    (movie.review) && (
    <div key={movie._id}>
    <p>{movie.movie_id.title}</p>
    <p>{movie.review}, {movie.rating} </p>
    </div>)
))}

</div> 

</>
}