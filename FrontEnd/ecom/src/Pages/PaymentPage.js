
import Payment from '../Components/Payment';
import { useLoaderData, json, redirect } from "react-router-dom";
import { getAuthToken } from "../util/auth";

function PaymentPage () { 
    const totalPrice = useLoaderData();
    return (
        <div>
            <Payment method="Post" totalPrice={totalPrice} />
        </div>
    )
}

export default PaymentPage;

export async function loader({params}){
    const token = getAuthToken();
    const totalPrice = params.totalPrice; 
    console.log("totalPrice in loader Payment Page" +totalPrice);
    return totalPrice;
}