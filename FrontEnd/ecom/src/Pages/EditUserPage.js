import Signup from "../Components/Signup";
import { useLoaderData } from "react-router-dom";
import {json, redirect} from 'react-router-dom'
import { getAuthToken } from "../util/auth";
function EditUserPage() {

    const user  = useLoaderData();

    return (
       // <Signup method="post"/>
        <Signup method="PATCH" user={user} />
       
    );
}

export default EditUserPage;

export async function loader({request, params}){
    const token = getAuthToken();
    const userid = params.id; 
    console.log("userid in loder.." +userid);

   
    const response = await fetch(process.env.REACT_APP_BASEURL+'user?id='+userid, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        }
        
    });

    console.log("response: " +response);

    if(!response.ok){
     throw json({message: 'Could not fetch event.'}, {status: response.status, statusText: response.statusText});
    }else{
        const resData = await response.json();
        console.log("Response Data.......................: "+resData.udto);
        return resData.udto;
    }

}