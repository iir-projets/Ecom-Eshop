import { useLoaderData, json, redirect } from 'react-router-dom';
import { getAuthToken } from "../util/auth";
import classes from "../css/style.css";
export async function loader({request, params}){
    //Action to delete the User
    const token = getAuthToken();
    const id = params.id; 
    console.log("id" +id);
    const response = await fetch(process.env.REACT_APP_BASEURL+'deleteCategory?id='+id, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log("response: " +response);

    if(!response.ok){
     throw json({message: 'Could not fetch event.'}, {status: response.status, statusText: response.statusText});
    }else{

       alert("Category Deleted Successfully...");
        return redirect('/categorylist');
    }

    
}
