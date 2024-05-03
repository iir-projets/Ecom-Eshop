import { Link,  } from "react-router-dom";
import '../css/styleSIGNUP.css';
import classes from "../css/style.css";
function Cart({ cartItems }) {

    //console.log("cartItems=====: "+cartItems[0].productName);
    let totalPrice = 0;
    return (
<>          
<section className="h-100">
  <div className="container h-100 py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-10">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="lol" style={{ textDecoration: 'underline'}}>Shopping Cart</h3>
        </div>
        {   
        
        cartItems.map((cItem) => (   
            <>
          <div className="card rounded-3 mb-4">
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
            <p key={cItem.id}></p>
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img src={`data:image/png;base64,${cItem.image}`}  height={200} width={200} className="img-fluid rounded-3" alt="Product Image"/>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <span>Product Name</span><p className="lead fw-normal mb-2">{cItem.productName}</p>
               
              </div>
    
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <span>Price</span> <h5 className="mb-0">{cItem.price}</h5>
              {totalPrice = totalPrice + cItem.price}
              </div>
              <div className="col-md- col-lg-1 col-xl-1 text-end">
              <Link to={`/deleteCartProduct/${cItem.id}`} className="m-0 btn btn-danger btn-sm" role="button" aria-disabled="true"> Delete </Link>
              </div>
            </div>
          </div>
        </div>
        </>
))}
<div class="card">
          <div class="card-body">
            
            <Link to="/order" className="m-1 btn btn-primary btn-lg" role="button" aria-disabled="true"> Pay Total {totalPrice} </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
    );
}

export default Cart;