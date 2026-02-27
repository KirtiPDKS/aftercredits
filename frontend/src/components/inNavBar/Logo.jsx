import { Link } from "react-router-dom";

const Logo = ({loggedIn}) => {

    const pageRef = loggedIn ? "/movies" : "/login";

  return (
    <Link
      to={pageRef}
      className="navbar-brand fw-bold fs-3 text-decoration-none text-warning"
    >
      Aftercredits
    </Link>
    );
};

export default Logo;