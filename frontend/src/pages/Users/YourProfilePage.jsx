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
<div className="container mb-4" >
    <div className="d-flex overflow-x-auto gap-3 align-items-stretch">
    {watchedMovies.filter((movie) => (movie.movie_id)).map((movie) => (
        <div className="flex-shrink-0 d-flex"
        key={movie.movie_id._id}> 
        <Link to={`/movies/${movie.movie_id._id}`} className="text-decoration-none text-dark h-100 d-flex flex-column">
            <Movies movie={movie.movie_id} />
        </Link>
        </div> 
    ))}
    </div>
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