import Categories from "../Components/Categories";
import { useLoaderData } from "react-router-dom";
import {json, redirect} from 'react-router-dom'
import { getAuthToken } from "../util/auth";


function CategoryEditPage() {

    const category = useLoaderData();

    return (
        <div>
            <Categories method="PATCH" category ={category}/>
        </div>
    );
}

export default CategoryEditPage;

export async function loader({request, params}){
    const token = getAuthToken();
    const categoryId = params.id; 
    console.log("categoryId in loder.." +categoryId);

   
    const response = await fetch(process.env.REACT_APP_BASEURL+'category?id='+categoryId, {
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
        console.log("Response Data...  : "+resData.category);
        return resData.category;
    }

}