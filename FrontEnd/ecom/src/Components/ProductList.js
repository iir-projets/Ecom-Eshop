import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { getUserRole } from "../util/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import marbImage from "../Image/marb.jpg";
import "../css/productlist.css"; 
import classes from "../css/style.css";
import Carousel from 'react-bootstrap/Carousel';


function ProductList({ products }) {
    const userRole = getUserRole();

    return (
        <div className="container">
            <h1 style={{ textDecoration: 'underline'}}>Product List</h1>
            {userRole === 'User' && ( // Vérifiez si l'utilisateur a le rôle "User"
                <section id="recommandations" style={{ width: '70%', margin: '0 auto', backgroundColor: '#f2f2f2', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '50px',marginBottom: '50px', backgroundImage: `url(${marbImage})`, backgroundSize: 'Cover'}}>
                    <div className="container">
                        <div className="red-divider"></div>
                        <div className="heading">
                            <center><h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '60px', padding: '0', marginTop: '0', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'white' }}>Recommandations</h2></center>
                        </div>
                        <Carousel id="myCarousel" className="carousel slide text-center" data-bs-ride="carousel">
                            <Carousel.Item>
                                <h3>"Ce rouge à lèvres est incroyable ! La teinte est magnifique et la texture est si crémeuse. Je suis totalement fan !"</h3>
                                <h4>Emma, passionnée de maquillage</h4>
                            </Carousel.Item>
                            <Carousel.Item>
                                <h3>"J'ai enfin trouvé le mascara parfait ! Il allonge mes cils sans faire de paquets, et il tient toute la journée sans bavures. Je le recommande à toutes mes amies !"</h3>
                                <h4>Laura, maquilleuse professionnelle</h4>
                            </Carousel.Item>
                            <Carousel.Item>
                                <h3>"Cette palette d'ombres à paupières est tout simplement géniale ! Les couleurs sont pigmentées et se mélangent parfaitement. Je peux créer des looks incroyables avec elle."</h3>
                                <h4>Julie, amatrice de maquillage</h4>
                            </Carousel.Item>
                            <Carousel.Item>
                                <h3>"Je suis impressionnée par ce fond de teint. Il couvre parfaitement toutes mes imperfections tout en laissant ma peau respirer. Je me sens tellement confiante quand je le porte !"</h3>
                                <h4>Sophie, adepte du maquillage naturel</h4>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </section>
            )}
            <div className="row">
                {products.map((pro) => (
                    <div key={pro.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img className="card-img-top" src={`data:image/png;base64,${pro.image}`} alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{pro.productName}</h5>
                                <p className="card-text">Category: {pro.catName}</p>
                                <p className="card-text">Quantity: {pro.quantity}</p>
                                <p className="card-text">Price: {pro.price}</p>
                                <div className="btn-group" role="group" aria-label="Product Actions">
                                    {userRole === 'Admin' &&
                                        <>
                                            <Link to={`/editproduct/${pro.id}`} className="btn btn-primary">Edit</Link>
                                            <Link to={`/deleteproduct/${pro.id}`} className="btn btn-danger">Delete</Link>
                                        </>
                                    }
                                    <Link to={`/addToCart/${pro.id}`} className="btn btn-warning">Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
