import { Form } from 'react-router-dom';
import { json, redirect } from 'react-router-dom'
import { getAuthToken } from "../util/auth";
import { useActionData } from 'react-router-dom';
import { useState } from "react";
import Select from "react-select";
import classes from "../css/style.css";
import set3 from "../Image/set3.png";


let imageFile = null;
let product = null;
let categoryList = null;



function Products({ method, productDetails, category }) {
  const token = getAuthToken();
  const errData = useActionData();
  const [image, setImage] = useState(false);

  if (method === "PATCH") {
    product = productDetails.product[0];
    categoryList = productDetails.categories;
  }else{
     product = null;
     categoryList = null;
  }
  const handleImageUpload = (event) => {
    imageFile = event.target.files[0];
    setImage(true);
  };

  
  return (
    <>

      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px;' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ textDecoration: 'underline'}}>Add Product</p>

                      <Form classNameName="mx-1 mx-md-4" method={method} encType="multipart/form-data">

                        {errData && errData.errors && <ul>
                          {Object.values(errData.errors).map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>}
                        {errData && errData.message && <p class="text-danger">{errData.message}</p>}

                        <input id="id" type="hidden" name="id" required defaultValue={product ? product.id : ''} />


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                           
                              <select class="form-select" aria-label="Default select example" name='catId' >
                                <option selected>Select Categories</option>
                                {category ? category.map((cat) => (
                                  <option value={cat.id}>{cat.name}</option>
                                )) : categoryList  && categoryList.map((cat) => (
                                  <option value={cat.id}>{cat.name}</option>
                                ))}

                              </select>

                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" name="productName" id="form3Example1c" className="form-control" required defaultValue={product ? product.productName : ''} />
                            <label className="form-label" for="form3Example1c">Product Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" name="price" id="form3Example1c" className="form-control" required defaultValue={product ? product.price : ''} />
                            <label className="form-label" for="form3Example1c">Product Price</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" name="quantity" id="form3Example1c" className="form-control" required defaultValue={product ? product.quantity : ''} />
                            <label className="form-label" for="form3Example1c">Product Quantity</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              id="form3Example1c"
                              className="form-control"
                              required
                              onChange={handleImageUpload}
                            />
                            <label className="form-label" for="form3Example1c">
                              Image
                            </label>
                            {method === "PATCH" && product.image && !image && <img class="d-block img-fluid" src={`data:image/png;base64,${product.image}`} alt="" />}
                          </div>
                        </div>


                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">{token ? 'Save' : 'Save'}</button>
                        </div>

                      </Form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src={set3}
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;


export async function action({ request }) {
  const method = request.method;
  const fromData = await request.formData();
  const token = getAuthToken();

  let proData = {
    catId: fromData.get("catId"),
    productName: fromData.get("productName"),
    price: fromData.get("price"),
    quantity: fromData.get("quantity"),
    image: "",
  }
  console.log("JSON.stringify(eventData): " + JSON.stringify(proData));


  let url = process.env.REACT_APP_BASEURL + 'addProduct'

  console.log("method: " + method)
  console.log("URK: " + url)

  if (method === "PATCH") {
    url = process.env.REACT_APP_BASEURL + "updateProduct";
    proData = {
      id: fromData.get("id"),
      catId: fromData.get("catId"),
      productName: fromData.get("productName"),
      price: fromData.get("price"),
      quantity: fromData.get("quantity"),
      image: "",

    }
  }

  const data = new FormData();
  data.append("productData", JSON.stringify(proData));
  data.append("image", imageFile);

  console.log("Final cat_Data: " + JSON.stringify(data))

  var config = {};

  if (token) {
    config = {
      'Authorization': 'Bearer ' + token,
    };
  } else {
    config = {
      'Content-Type': 'application/json'
    };
  }
  const response = await fetch(url, {
    method: method,
    headers: config,
    body: data
  });

  if (!response.ok) {
    throw json({ message: 'Could not create User' }, { status: 500 });
  } else {
    if (token) {
      alert("products Created Successfully");
      return redirect('/products');
    } else {
      alert("products Created Successfully");
      return redirect('/products');
    }

  }

}