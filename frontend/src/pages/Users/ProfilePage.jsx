import { useEffect,useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import { getUser } from "../../services/user";
import { getUserWatchedMovies } from "../../services/movies";

export function ProfilePageBase() {
    const {username} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [watchedMovies, setWatchedMovies] = useState([])

      useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
          navigate("/login")
          return;
        }
          getUser(username,token)
            .then((data) => {
              setUser(data.user);
              localStorage.setItem("token", data.token);
            })
            .catch((err) => {
              console.error(err);
              navigate("/login");
            });

            getUserWatchedMovies(username,token)
            .then((data) => {
              setWatchedMovies(data.movies);
            })
            .catch((err) => {
              console.error(err);
            });
        },[username,navigate]);



    if (!user) return <p>Loading user...</p>

    return <>
    <h2>Welcome to the userspage</h2>
    <h2>{user.username}</h2>
    <div>{user.image}</div>


    <h3>Watched Films</h3>
    <div className="container row" >
        {watchedMovies.map((movie) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          key={movie._id}> 
          <Movies movie={movie} />
          </div> 
        ))}
      </div>


    </>
}