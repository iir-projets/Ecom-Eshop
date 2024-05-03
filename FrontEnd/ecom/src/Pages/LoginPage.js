import Login from "../Components/Login";
import { json, redirect } from "react-router-dom";
function LoginPage(){
    return(
      <Login method="post"/>
    )
}

export default LoginPage;

export async function action({ request }) {

 
  const data = await request.formData();
  const authdata ={
    username : data.get('username'),
    password : data.get('password')
  }

  const url= process.env.REACT_APP_BASEURL+"token";
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authdata)
  })

  if(response.status === 422 || response.status === 401){
      return response;
    }

    if(!response.ok){
      return json({message: 'Not a valid User'}, {status: 500})
    }

    const resData = await response.json();
    const token = resData.token;
    console.log("resData.userInfo: "+resData.user.role)
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', resData.user.role)
   localStorage.setItem('userId', resData.user.id)
    localStorage.setItem('userData', JSON.stringify(resData.user) )
   return  redirect('/')
}