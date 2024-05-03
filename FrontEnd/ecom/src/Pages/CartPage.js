import Cart from "../Components/Cart";
import { useLoaderData, json, redirect } from "react-router-dom";
import { getAuthToken } from "../util/auth";

function CartPage(){

    const cartItems = useLoaderData();

    return(
        <div>
            <Cart cartItems = {cartItems}/>
        </div>
    )
}

export default CartPage;


export async function loader({request, params}){
    const token = getAuthToken();
    const productId = params.id; 
    console.log("product in loder.." +productId);
    let url = '';
    if(productId>0){
        url = process.env.REACT_APP_BASEURL+'addCart?id='+productId
    }else{
        url = process.env.REACT_APP_BASEURL+'cartsByUser'
    }
   
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          
        }
        
    });

    console.log("response: " +response);

    if(!response.ok){
      //  console.log("Res:" +response.message);
        // throw json({message: 'Could not fetch event.'}, {status: response.status, statusText: response.statusText});
        alert("Product is already in cart")
    return redirect('/productlist');
     
    
    
    }else{
        const resData = await response.json();
        console.log("Res else:" +response.message);
      //  console.log("Response Data...  : "+resData.carts[0].productName);
        console.log("Res Data:" +resData);
        return resData.carts;
    }

}