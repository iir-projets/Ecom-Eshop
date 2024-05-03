import {Form, json} from "react-router-dom";
import { useActionData } from "react-router-dom";
import hi from "../Image/hi.png";
import classes from "../css/style.css";

function Login({method}){
  const data = useActionData();
    return  <>
    <section className="vh-100">
   <div className="container py-5 h-100">
     <div className="row d-flex align-items-center justify-content-center h-100">

       <div className="col-md-8 col-lg-7 col-xl-6">
         <img src={hi}
           className="img-fluid" alt="Phone image"/>
       </div>
       <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
       <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Welcome Back !</p>
      
         <Form method={method}>

         {data && data.errors && <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>}
          {data && data.message && <p class="text-danger">{data.message}</p>}
        
           <div className="form-outline mb-4">
           <label className="form-label" for="form1Example13">UserName</label>
             <input type="text" id="form1Example13" name="username" className="form-control form-control-lg" />
        
           </div>
 
           <div className="form-outline mb-4">
           <label className="form-label" for="form1Example23">Password</label>
             <input type="password" name="password" id="form1Example23" className="form-control form-control-lg" />
             
           </div>

           <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
 
         </Form>
       </div>
     </div>
   </div>
 </section>
         </>
}

export default Login;