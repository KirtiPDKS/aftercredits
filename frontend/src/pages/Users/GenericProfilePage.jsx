import { useEffect,useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import { getCurrentUser, getUser } from "../../services/users";
import { getUserWatchedMovies } from "../../services/moviesWatched";
import { Link } from "react-router-dom";
import Movies from "../../components/Movie";
import FollowButton from "../../components/FollowButton";
import { use } from "react";
import { getUsersFollowers,getUsersFollowing } from "../../services/followers";
import FollowerModal from "../../components/FollowersModal";
import FollowingModal from "../../components/FollowingModal";

export function GenericProfilePage() {
const {username} = useParams();
const navigate = useNavigate();
const [user, setUser] = useState(null)
const [watchedMovies, setWatchedMovies] = useState([])
const [Image, setImage] = useState(null);
const [isFollowing, setisFollowing] = useState(false)
const [followerCount, setFollowerCount] = useState(0)
const [followingCount, setFollowingCount] = useState(0)
const [followers, setFollowers] = useState([])
const [following, setFollowing] = useState([])

    useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/login")
        return;
    }
    
    getCurrentUser(token).then((data)=> {
        if (username == data.user.username) {
        navigate("/users/myprofile", { replace: true })
        return 
        }})
    
    getUser(username,token)
        .then((data) => {
            setUser(data.user);
            setisFollowing(data.isFollowing);
            setFollowerCount(data.followers);
            setFollowingCount(data.following);
            if (data.user.profile_image) {
            setImage(
            `${import.meta.env.VITE_BACKEND_URL}${data.user.profile_image}`
            );
        } else {
            setImage("https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg")
        };
        if(data.token){localStorage.setItem("token", data.token)};
        
      return Promise.all([
      getUsersFollowers(data.user._id, token),
      getUsersFollowing(data.user._id, token),
    ]);
  })
  .then(([followersData, followingData]) => {
    console.log(followingData)
    setFollowers(followersData.followers);
    setFollowing(followingData.following);
    console.log(followersData)
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


return (
  <div className="container mt-4">
    <div className="card shadow-sm mb-4 p-4">
      <div className="d-flex align-items-center justify-content-center gap-3">
      {Image && (
        <img
          src={Image}
          alt="Profile"
          className="rounded-circle"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
      )}
    <h2 className="mb-0">{user.username}</h2>
     <span><FollowButton userId={user._id} initiallyFollowing={isFollowing}/></span>
     <span className="text-primary" style={{cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#FollowerModal">
      {followerCount} Followers</span>
     <span className="text-primary" style={{cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#FollowingModal">
      {followingCount} Following</span>
    </div>
   
    </div>

    {/* Movies Watched Section */}
    <div className="card shadow-sm mb-4 p-4">
    <h4 className="mb-3">Movies Watched</h4>

    {watchedMovies.length === 0 ? (
        <p className="text-muted">No movies watched yet.</p>
    ) : (
        <div className="d-flex overflow-x-auto gap-3 align-items-stretch">
        {watchedMovies.map((movie) => (
            <div
            className="flex-shrink-0 d-flex h-100"
            key={movie.movie_id._id}
            >
            <Link
                to={`/movies/${movie.movie_id._id}`}
                className="text-decoration-none text-dark h-100 d-flex flex-column"
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
    <FollowerModal followers={followers} />
    <FollowingModal following={following}/>
    </div>
);



}
