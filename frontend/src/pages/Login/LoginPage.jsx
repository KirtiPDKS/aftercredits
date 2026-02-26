import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { login } from "../../services/authentication";

export function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setLoggedIn } = useOutletContext();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(user, password);
      localStorage.setItem("token", token);

      setLoggedIn(true);
      
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setError(err.message)
      navigate("/login")
    }
  }
  return (
    <div className="SignupLogin">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card bg-black border-black shadow-sm p-4">
            <h1 className="mb-2 text-center text-warning Title">AfterCredits</h1>
            <p className="mb-4 text-center">Login to your account:</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  id="user"
                  type="text"
                  className="form-control"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Email or Username"
                />
              </div>

              <div className="mb-3">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <button type="submit" className="btn btn-warning w-100" role="submit-button">
                Submit
              </button>
            </form>

            {error && (
              <div className="alert alert-danger mt-3">
                {error}
              </div>
            )}

            <div className="text-center mt-3">
              <a href="/signup" className="link-warning">
                Don't have an account? Sign Up
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
