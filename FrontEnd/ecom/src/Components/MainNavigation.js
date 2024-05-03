import { Link } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { getUserRole } from "../util/auth";
import "../css/style.css";
import classes from "../css/style.css";
import ladies from "../Image/ladies.png"
import liplip from "../Image/lipstick.png"

function MainNavigation() {

  const token = useRouteLoaderData("root")
  const userRole = getUserRole();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
          <img src={ladies} alt="Ladies Empire" /> Ladies Empire
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ textAlign: "right" }}>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          


            {!token && (
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>SignUp</Link>
              </li>
            )}
  {!token && (
              <li className="nav-item">
               <Link className="nav-link login-button" to={"/login"}>Login</Link>

              </li>
            )}

            {userRole === 'Admin' && (
              <>
              
                <li className="nav-item">
                  <Link className="nav-link" to={"/signup"}>Add User</Link>
                </li>

                {token && (
                  <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/userlist"}>UserList</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/categories"}>Add Categories</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/categorylist"}>CategoryList</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/products"}>Add Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/productlist"}>ProductList</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/orderhistorylist"}>Order History</Link>
                  </li>
               
                  
                  </>
                  
                )}


              </>



            )}

            {userRole === 'User' && (
              <>
                {token && (
                  <>
                      <li className="nav-item">
                    <Link className="nav-link" to={"/categorylist"}>CategoryList</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={"/productlist"}>ProductList</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/orderhistorylist"}>Order History</Link>
                  </li>
               
                   
                  </>


                )}



              </>



            )}


            {token && (
              <>
                 <li className="nav-item">
                    <Link className="nav-link" to={"/cartList"}>MyCart</Link>
                  </li>
              <li className="nav-item">
                <Form action="/logout" method="post">
                  <button className="btn btn-info btn-l">Logout</button>
                </Form>
              </li>
              </>
            )}

          </ul>

        </div>
      </nav>

    </>
  )
}
export default MainNavigation;