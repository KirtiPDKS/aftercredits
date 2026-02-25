import { useNavigate } from "react-router-dom";

function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    onLogout();
    navigate("/");
  }

  return <button onClick={logOut} className="btn btn-outline-light">Log out</button>;
}

export default LogoutButton;
