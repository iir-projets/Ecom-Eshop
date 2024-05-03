import { Form } from 'react-router-dom';
import { json, redirect } from 'react-router-dom'
import { getAuthToken } from "../util/auth";
import { useActionData } from 'react-router-dom';
import {getUserData} from "../util/auth";
import classes from "../css/style.css";
function Payment({method, totalPrice}){
    const user = getUserData();
    return(
        <>
<section className="gradient-custom">
  <div className="container my-5 py-5">
    <div className="row d-flex justify-content-center py-5">
      <div className="col-md-1 col-lg-5 col-xl-4">
        <div className="card" >
          <div className="card-body p-4">
          <p className="text-center h1 fw-bold mb-1 mx-1 mx-md-1 mt-1">Payment</p>
            <Form method={method}>
          
            <input id="id" type="hidden" name="id" required defaultValue={user ? user.id : ''} />
            <input id="id" type="hidden" name="username" required defaultValue={user ? user.username : ''} />
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-outline">
                  <input type="text" id="typeText" name='cardNumber' className="form-control form-control-lg"
                    placeholder="1234 5678 9012 3457" />
                  <label className="form-label" >Card Number</label>
                </div>
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="visa" width="64px" />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-outline">
                  <input type="text" id="typeName" name='cardHolderName' className="form-control form-control-lg"
                    placeholder="Cardholder's Name" />
                  <label className="form-label" >Cardholder's Name</label>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center pb-2">
                <div className="form-outline">
                  <input type="text" id="typeExp" name='expiryDate' className="form-control form-control-lg" placeholder="MM/YYYY"  />
                  <label className="form-label" >Expiration</label>
                </div>
                <div className="form-outline">
                  <input type="password" id="typeText2" name='cvv' className="form-control form-control-lg"
                    placeholder="&#9679;&#9679;&#9679;"  />
                  <label className="form-label" >Cvv</label>
                </div>

                <div>
                  <input type="text" id="typeText2" name='totalPrice' className="form-control form-control-lg"
                    value={totalPrice} />
                  <label className="form-label" >Total Price</label>
                </div>
                
              </div>
              <div>
              <button type="submit" className="btn btn-info btn-lg btn-rounded">Pay</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        
        </>
    )
}

export default Payment;

export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  let userData = {
      userId: data.get('id'),
      cardNumber: data.get('cardNumber'),
      cardHolderName: data.get('cardHolderName'),
      expiryDate: data.get('expiryDate'),
      cvv: data.get('cvv'),
      totalPrice: data.get('totalPrice'),
 

  }
  console.log("JSON.stringify(eventData): " + JSON.stringify(userData));

  let url = process.env.REACT_APP_BASEURL + 'AddPayment'

  console.log("method: " + method)
  console.log("URK: " + url)


  console.log("userData: " + JSON.stringify(userData))

  var config = {};

  if (token) {
    config = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  } else {
    config = {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(url, {
    method: method,
    headers: config,
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw json({ message: 'Could not create User' }, { status: 500 });
  } else {
    if (token) {
      const resData = await response.json();
       alert("Payment Done");

      return redirect('/productlist');
    } else {
      
      return redirect('/login');
    }

  }

}