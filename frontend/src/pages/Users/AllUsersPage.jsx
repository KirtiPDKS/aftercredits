import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../../services/users";
import User from "../../components/Users/User";
import "../../App.css"

const AllUsersPage = () => {

    const navigate = useNavigate();
    const [users,setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=> {
        const token = localStorage.getItem("token")
        if (!token){
            navigate("/login")
            return
        }

        getAllUsers(token).then((data)=> {
            setUsers(data)
        }).catch((err)=>{
            console.error(err)
        })
    },[navigate])

const filteredUsers = users.filter(
  (user) => {
      return user.username.toLowerCase().includes(search.toLowerCase())
  }
)

return (
  <div className="container mt-4">
    <div className="text-center mb-4">
      <h2 className="fw-bold Title text-warning">Other Users</h2>
      <p className="text-muted">
        Discover other members of the Community
      </p>
    </div>
    <div className="input-group mb-4">
      <span className="input-group-text">Search</span>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control"
        aria-label="Search"
        placeholder="Search For Users"
        />
    </div>

    {filteredUsers.length === 0 ? (
      <div className="card p-4 text-center shadow-sm">
        <p className="text-muted mb-0">
          No users found.
        </p>
      </div>
    ) : (
      <div className="row"  id="scroll">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div className="card h-100 shadow-sm text-center p-3">
              <User user={user} />
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
);
}

export default AllUsersPage