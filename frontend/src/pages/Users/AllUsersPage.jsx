import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../../services/users";
import User from "../../components/Users/User";

const AllUsersPage = () => {

    const navigate = useNavigate();
    const [users,setUsers] = useState([]);

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

    return (
    <>
        <h2>All Users</h2>
        <p>List of all the users on the platform</p>
        <ul>
        {users.map((user) => (
        <User key={user._id} user={user}/>
        ))}
        </ul>
    </>
    );

}

export default AllUsersPage