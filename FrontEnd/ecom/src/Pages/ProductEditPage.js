import Products from "../Components/Products";
import { useLoaderData, json } from "react-router-dom";
import { getAuthToken } from "../util/auth";

function ProductEditPage() {

    const productDetails = useLoaderData();

    return (
        <>
        <Products method="PATCH" productDetails = {productDetails}/>
        </>
    );

  
}

export default ProductEditPage;

export async function loader({request, params}){
    const token = getAuthToken();
    const productId = params.id; 
    console.log("product in loder.." +productId);

   
    const response = await fetch(process.env.REACT_APP_BASEURL+'product?id='+productId, {
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
        console.log("Response Data...  : "+resData.product);
        return resData;
    }

}