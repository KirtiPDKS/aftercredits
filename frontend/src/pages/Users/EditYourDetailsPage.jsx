import { useEffect,useState} from "react";
import { useNavigate} from "react-router-dom"
import { getCurrentUser} from "../../services/users";

export function EditYourDetailsPage() {
const token = localStorage.getItem("token");

const navigate = useNavigate();
const [user, setUser] = useState(null)
const [password, setPassword] = useState('')
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [imagePreview, setImagePreview] = useState(null);
const [imageFile, setImageFile] = useState(null);
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

  if (data.user.profile_image) {
    setImagePreview(
      `${import.meta.env.VITE_BACKEND_URL}${data.user.profile_image}`
    );
  } else {
    setImagePreview("https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg")
  }

if(data.token){
  localStorage.setItem("token", data.token);
}
})
.catch((err) => {
console.error(err);
});
},[navigate, token]);

const numbers = [1,2,3,4,5,6,7,8,9,0]

const hasNumber = numbers.some(num =>
password.includes(num.toString())
)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.includes('@') && email.includes('.')){
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);

      if (imageFile) {
        formData.append("profile_image", imageFile);
      }
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/me`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
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
      <h1 className="mb-1 text-center text-warning Title">Your details</h1>
      <p className="mb-1 text-center">edit your details here:</p>

      <form onSubmit={handleSubmit}>

        <div className="text-center">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image"
              className="img-fluid rounded-circle"
              style={{
                width: "140px",
                height: "140px",
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
              const file = e.target.files[0];
              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }}
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
        <button role="details-button" className="btn btn-warning w-100 mb-3">Update Details</button>
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

        <button role="password-button" className="btn btn-warning w-100">
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