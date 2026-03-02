import { useEffect,useState} from "react";
import { useNavigate} from "react-router-dom"
import { getCurrentUser} from "../../services/users";
import { getMyWatchedMovies } from "../../services/moviesWatched";

export function EditYourDetailsPage() {
const token = localStorage.getItem("token");

const navigate = useNavigate();
const [user, setUser] = useState(null)
const [password, setPassword] = useState('')
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [image, setImage] = useState(null);
const [error, setError] = useState(null);


useEffect(() => {
  if(!token){
    navigate("/login")
  return;
}

getCurrentUser(token)
.then((data) => {
  setUser(data.user);
  setUsername(data.user.username);
  setEmail(data.user.email);
  setImage(data.user.profile_image);
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

const numbers = [1,2,3,4,5,6,7,8,9,0]

const hasNumber = numbers.some(num =>
password.includes(num.toString())
)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.includes('@') && email.includes('.')){
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/me`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          email,
          profile_image: image
        })
      }
    );
    alert("Details updated");
  }
  };

    const handlePasswordSubmit = async (e) => {
      e.preventDefault();
      if (password.length >= 8 === true && password.toLowerCase() !== password && hasNumber === true){
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/me/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        }
      )
      alert("Password updated");
    }
  };

if (!user) return <p>Loading user...</p>

return <>
<div>
  <div className="row justify-content-center">
    <div className="col-md-5">
      <div className="card bg-black border-black shadow-sm p-0">
      <h1 className="mb-2 text-center text-warning Title">Your details</h1>
      <p className="mb-4 text-center">edit your details here:</p>

      <form onSubmit={handleSubmit}>

        <div className="mb-3 text-center">
          {image && (
            <img
              src={image}
              alt="Image"
              className="img-fluid rounded-circle mb-3"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="ImageUpload">Set Profile Picture</label>
          <input
            type="file"
            id="ImageUpload"
            className="form-control"
            onChange={(e) => {
              setImage(URL.createObjectURL(e.target.files[0]))
            }
            }
          />
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="Email"
            placeholder="Email"
          />
          {!email.includes("@") && <div className="text-danger small">Email needs an @</div>}
          {!email.includes(".") && <div className="text-danger small">Email needs a dot</div>}
          <label htmlFor="Email">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="Username"
            placeholder="Username"
          />
          <label htmlFor="Username">Username</label>
        </div>
        <button role="submit-button" className="btn btn-warning w-100 mb-3">Update Details</button>
        </form>
        <form onSubmit={handlePasswordSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="Password"
          />
          {password.length < 8 && <div className="text-danger small">Password under 8 characters</div>}
          {password.toLowerCase() === password && <div className="text-danger small">Password needs a capital letter</div>}
          {hasNumber === false && <div className="text-danger small">Password needs a number</div>}
          <label htmlFor="Password">Password</label>
        </div>

        <button role="submit-button" className="btn btn-warning w-100">
          Update Password
        </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

      </div>
    </div>
  </div>
</div>
</>
}