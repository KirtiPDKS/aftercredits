import { Link } from "react-router-dom"

function User({user}) {

    return <li key={user._id}>
                <Link to={`/users/${user.username}`}>    
                    {user.username}
                    </Link>
    </li>
}

export default User 