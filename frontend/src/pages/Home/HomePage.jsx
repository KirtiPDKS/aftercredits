import { Link } from "react-router-dom";
import "../../App.css";

export function HomePage() {
  return (
    <div className="splashscreen text-center">
      <h1 className="mb-2 text-center text-warning Title">AfterCredits</h1>
      <p role='paragraph' className="mb-4 text-center">Discover and Celebrate the Films you Love</p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Link to="/signup" className="btn btn-warning">Sign Up</Link>
        <Link to="/login" className="btn btn-outline-warning">Log In</Link>
      </div>
    </div>
  );
}
