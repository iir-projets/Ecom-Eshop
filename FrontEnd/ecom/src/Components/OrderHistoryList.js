import { Link,  } from "react-router-dom";
import { getUserRole } from "../util/auth";
import classes from "../css/style.css";
function OrderHistoyList({orderHistory}) {

    const userRole = getUserRole();

    return (
        <>
        <div className="container">
        <h1 style={{ textDecoration: 'underline'}}>Order History List</h1>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">productName</th>
                    <th scope="col">username</th>
                    <th scope="col">quantity</th>
                    <th scope="col">price</th>
                    <th scope="col">Payment Status</th>
                 
                </tr>
            </thead>
            <tbody>
                {   
                
                orderHistory.map((order) => (
                     <tr key={order.id}>
                     <td>{order.productName}</td>
                     <td>{order.username}</td>
                     <td>{order.quantity}</td>
                     <td>{order.price}</td>
                     <td>{order.paymentStatus}</td>
                 </tr>
))}
            </tbody>
        </table>
        </div>
    </>

);
    
}
export default OrderHistoyList;