import { Link,  } from "react-router-dom";
import { getUserRole } from "../util/auth";
import classes from "../css/style.css";
function Userlist({users}) {
    const userRole = getUserRole();

    return (
        <>
         <div className="container">
            <h1 style={{ textDecoration: 'underline'}}>User List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">UserName</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Email</th>
                        {userRole === 'Admin'? <th scope="col">Action</th> : ''}
                     
                    </tr>
                </thead>
                <tbody>
                    {   
                    
                    users.map((user) => (
                         <tr key={user.id}>
                         <td>{user.firstName}</td>
                         <td>{user.lastName}</td>                     
                         <td>{user.username}</td>
                         <td>{user.role}</td>
                         <td>{user.email}</td>
                         {userRole === 'Admin'? 
                         <td>
                            {user.role === 'Admin'?'':
                            <>
                            <Link to={`/edituser/${user.id}`} className="m-1 btn btn-primary btn-lg" role="button" aria-disabled="true"> Edit </Link>
                            <Link to={`/deleteuser/${user.id}`} className="m-1 btn btn-danger btn-lg" role="button" aria-disabled="true"> Delete </Link>
                            </>
                        } </td> : ''}
                         

                     </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    )
}

export default Userlist;


