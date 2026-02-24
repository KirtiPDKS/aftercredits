import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to AfterCredits!</h1>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        <Link to="/login" className="btn btn-outline-primary">Log In</Link>
      </div>
    </div>
  );
}
