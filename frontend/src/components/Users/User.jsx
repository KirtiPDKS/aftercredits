import { Link } from "react-router-dom"

function User({user}) {
  const image = user.profile_image
    ? `${import.meta.env.VITE_BACKEND_URL}${user.profile_image}`
    : "https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg";
  return <div key={user._id}>
  <Link className="link-underline-dark" to={`/users/${user.username}`}>    
    <div className="d-flex align-items-center justify-content-center gap-3">
    {image && (
      <img
        src={image}
        alt="Profile"
        className="rounded-circle"
        style={{ width: "30px", height: "30px", objectFit: "cover" }}
      />
    )}
  <h5 className="mb-0 text-white">{user.username}</h5>
  </div>
  </Link>
  </div>
}

export default User 