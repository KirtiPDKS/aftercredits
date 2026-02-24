import image from "../../assets/acebook.svg";

const Logo = ({loggedIn}) => {

    const pageRef = loggedIn ? "/movies" : "/login";

    return <a href={pageRef}> <img src={image} alt="Logo" className="nav-logo"/></a>;
};

export default Logo;