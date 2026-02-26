// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { getAllUsers } from "../../services/user";

// const AllUsersPage = () => {

//     const navigate = useNavigate();
//     const [users,setUsers] = useState([]);

//     useEffect(()=> {
//         const token = localStorage.setItem("token")
//         if (!token){
//             navigate("/login")
//             return
//         }

//         getAllUsers(token).then((data)=> {
//             setUsers(data.users)
//         }).catch((err)=>{
//             console.error(err)
//         })
//     },[navigate])

//    return (
//   <>
//     <h2>All Users</h2>
//     <p>List of all the users on the platform</p>
//     <ul>
//       {users.map((user) => (
//         <li key={user.id}>{user.username}</li>
//       ))}
//     </ul>
//   </>
// );

// }

// export default AllUsersPage