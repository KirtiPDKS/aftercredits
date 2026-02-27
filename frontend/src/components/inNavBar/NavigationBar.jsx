import { Link } from "react-router-dom";
import Logo from "./Logo"
import LogoutButton from "../LogoutButton"

const NavigationBar = ({loggedIn,setLoggedIn}) => {

    const handleLogout = () => {
        setLoggedIn(false)
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Logo */}
          <Logo loggedIn={loggedIn} />

        {/* Right side buttons */}
        <div className="d-flex align-items-center gap-3">
          {loggedIn && <Link className="nav-link" to="/users/all">All Users</Link>}
          {loggedIn && <Link className="nav-link" to="/browse">Browse</Link>}
          {loggedIn && <Link className="nav-link" to="/users/myprofile">Your Profile</Link>}
          {loggedIn && <Link className="nav-link" to="/account">Account Settings</Link>}
          {loggedIn && <LogoutButton onLogout={handleLogout} />}
        </div>

      </div>
    </nav>
  );
};

export default NavigationBar