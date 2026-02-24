import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { signup } from "../../services/authentication";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const numbers = [1,2,3,4,5,6,7,8,9,0]

  const hasNumber = numbers.some(num =>
    password.includes(num.toString())
  )
  async function handleSubmit(event) {
    event.preventDefault();
    if (password.length >= 8 === true && password.toLowerCase() !== password && hasNumber === true){
      if (email.includes('@') && email.includes('.')){
      try{
      await signup(email,username, password);
      navigate("/login");
    } catch (err) {
      console.error(err);
       setError(err.message);
       navigate("/signup")
    }
  }
  }

}

  return (
    <div className="container py-5 SignupLogin">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card bg-black border-black shadow-sm p-4">
            <h2 className="mb-2 text-center text-warning Title">AfterCredits</h2>
            <p className="mb-4 text-center">create an account here:</p>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {!email.includes("@") &&
                  <div className="text-danger small">Email needs an @</div>}
                {!email.includes(".") &&
                  <div className="text-danger small">Email needs a dot</div>}
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {password.length < 8 &&
                  <div className="text-danger small">
                    Password under 8 characters
                  </div>}
                {password.toLowerCase() === password &&
                  <div className="text-danger small">
                    Password needs a capital letter
                  </div>}
                  {hasNumber === false &&
                  <div className="text-danger small">
                    Password needs a number
                  </div>}
              </div>

              <button className="btn btn-warning w-100">
                Submit
              </button>
            </form>

            {error &&
              <div className="alert alert-danger mt-3">
                {error}
              </div>
            }

            <div className="text-center mt-3">
              <a href="/login" className="link-warning">Already have an account? Login</a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}