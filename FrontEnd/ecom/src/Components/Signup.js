import { Form } from 'react-router-dom';
import { json, redirect } from 'react-router-dom'
import { getAuthToken } from "../util/auth";
import { useActionData } from 'react-router-dom';
import avatare from "../Image/avatare.png";
import classes from "../css/style.css";
import '../css/styleSIGNUP.css';

function Signup({ method, user }) {
  const token = getAuthToken();
  const data = useActionData();
  return <>
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px;' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ textDecoration: 'underline'}}>Sign up</p>

                    <Form classNameName="mx-1 mx-md-4" method={method}>

                      {data && data.errors && <ul>
                        {Object.values(data.errors).map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>}
                      {data && data.message && <p class="text-danger">{data.message}</p>}
                      
                      <input id="id" type="hidden" name="id" required defaultValue={user ? user.id : ''} />
                      <input id="id" type="hidden" name="accountNumber" required defaultValue={user ? user.accountNumber : ''} />

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example1c">First Name</label>
                          <input type="text" name="firstName" id="form3Example1c" className="form-control" required defaultValue={user ? user.firstName : ''} />
                         
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example1c">Last Name</label>
                          <input type="text" name="lastName" id="form3Example1c" className="form-control" required defaultValue={user ? user.lastName : ''} />
                          
                        </div>
                      </div>


                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example1c">User Name</label>
                          <input type="text" name="username" id="form3Example1c" className="form-control" required defaultValue={user ? user.username : ''} />
                          
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example3c">Your Email</label>
                          <input type="email" name="email" id="form3Example3c" className="form-control" required defaultValue={user ? user.email : ''} />
                        
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example4c">Password</label>
                          <input type="password" name='password' id="form3Example4c" className="form-control" required defaultValue={user ? user.password : ''} />
                        
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">{token ? 'Save' : 'Save'}</button>
                      </div>

                    </Form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src={avatare}
                      className="img-fluid" alt="Sample image" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  </>
  
}

export default Signup;


export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  let userData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    email: data.get('email'),
    password: data.get('password'),
    username: data.get('username'),
    role: "User",

  }
  console.log("JSON.stringify(eventData): " + JSON.stringify(userData));

  let url = process.env.REACT_APP_BASEURL + 'registration'

  console.log("method: " + method)
  console.log("URK: " + url)
  if (method === "PATCH") {
    url = process.env.REACT_APP_BASEURL + "updateuser";
    userData = {
      id: data.get('id'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      accountNumber: data.get('accountNumber'),
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      role: "User",

    }
  }

  console.log("userData: " + JSON.stringify(userData))

  var config = {};

  if (token) {
    config = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  } else {
    config = {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(url, {
    method: method,
    headers: config,
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw json({ message: 'Could not create User' }, { status: 500 });
  } else {
    if (token) {
      return redirect('/userlist');
    } else {
      alert("User Created Successfully");
      return redirect('/login');
    }

  }

}