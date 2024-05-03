import classes from "../css/style.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import ladies from "../Image/ladies.png";
import ladies2 from "../Image/ladies2.png";
import model1 from "../Image/model1.png"; // Importer l'image
import setbanner from "../Image/setmakeup.png"; // Importer la nouvelle image
import aboutimg from "../Image/vid.mp4"; // Importer la vidéo
import set2 from "../Image/set2.png";
import avatar from "../Image/avatar.png";
import avatar1 from "../Image/avatar1.png";
import avatar2 from "../Image/avatar2.png";
import avatar3 from "../Image/avatar3.png";
import logo from "../Image/icon/logo.png";
import locationIcon from "../Image/icon/location.png";
import phoneIcon from "../Image/icon/phone.png";
import mailIcon from "../Image/icon/mail.png";
import facebookIcon from "../Image/icon/fb.png";
import instagramIcon from "../Image/icon/insta.png";
import twitterIcon from "../Image/icon/tt.png";
import youtubeIcon from "../Image/icon/ytube.png";
import linkedinIcon from "../Image/icon/linkedin.png";
import liplip from "../Image/lipstick.png"
function Home() {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);
    return (
        <>
            <div className='homeContentWrapper'>
                <div className="banner">
                    
                <img src={model1} alt="Model 1" className="bannerImage" />

                    <div className="bannerText">
                    <img src={liplip} alt="Set Banner" className="setBannerImage" />
                        <h1>"Empower your beauty"</h1>
                        <p>Chez nous, le maquillage va bien au-delà de sa fonction traditionnelle de masquage. C'est bien plus qu'une simple couche de produits sur la peau. C'est un art de se transformer, de souligner et de magnifier ce qui est déjà là, de manière authentique.</p>
                    </div>
                </div>
               
            </div>
            <section className="about">
      <div className="container-fluid">
        <h1 className="text-center py-5">About Beauty</h1>
        <div className="row">
          <div className="row">
            <div className="col-md-6 px-5" data-aos="fade-right" data-aos-duration="3000" style={{ animation: 'slideInLeft 1s forwards' }}>
            <h1 style={{textDecoration: 'underline' , color: '#a68dad'}}>Notre Art : Création de Beauté</h1>
              <p>nous croyons en l'importance de chaque détail. C'est pourquoi nous sélectionnons avec soin les ingrédients les plus fins et les formules les plus avancées pour créer des produits qui non seulement embellissent, mais qui nourrissent également votre peau. Chaque produit est le fruit d'un processus de recherche approfondi, de développement méticuleux et de tests rigoureux, garantissant ainsi une qualité et une performance exceptionnelles.<br/>
                </p>
            </div>
            <div className="col-md-6 content text1" data-aos="fade-up" data-aos-duration="3000" style={{ animation: 'slideInRight 1s forwards' }}>
            <video src={aboutimg} controls className="img-fluid" data-aos="fade-up" />
              
              
            </div>
            
          </div>
        </div>
      </div>
    </section>
    <section className="about">
     <div className="container-fluid">
       
        <div className="row">
          <div className="row">
            <div className="col-md-6 px-5" data-aos="fade-right" data-aos-duration="3000" style={{ animation: 'slideInLeft 1s forwards' }}>
            <img src={set2} controls className="img-fluid2"  style={{marginTop: '-150px'}} data-aos="fade-right"/>
            </div>
            <div className="col-md-6 content text1" data-aos="fade-up" data-aos-duration="3000" style={{ animation: 'slideInRight 1s forwards' }}>
        
              
            <h1 style={{ textDecoration: 'underline', textAlign: 'right', color: '#a68dad', }}>Découvrez Notre Histoire</h1>

            <p style={{ textAlign: 'right' }}>Notre histoire est façonnée par notre passion pour l'innovation, notre engagement envers la qualité et notre amour pour l'art du maquillage. Chaque produit que nous créons est le fruit d'un processus de conception minutieux, où la créativité rencontre la science pour donner naissance à des formules exceptionnelles et des teintes éclatantes.
            Mais notre histoire ne serait pas complète sans vous, nos précieux clients. C'est grâce à votre soutien et à votre fidélité que nous continuons à grandir et à évoluer. Nous vous invitons à faire partie de notre histoire en explorant notre collection de produits de maquillage et en découvrant comment nous pouvons vous aider à révéler votre beauté unique.
            </p>

            </div>
            
          </div>
        </div>
      </div>
    </section>
    <section style={{backgroundColor: '#ffe6e6' , margintp: '100px'}}>
                <div className="py-5 team4">
                    <div className="container">
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-7 text-center">
                                <h3 className="mb-3">Notre Équipe Expérimentée et Professionnelle</h3>
                                <h6 className="subtitle">Nous sommes fiers de notre équipe passionnée et dévouée qui travaille sans relâche pour offrir à nos clients une expérience exceptionnelle.</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 mb-4">
                                <div className="row">
                                    <div className="col-md-12" data-aos="zoom-in" data-aos-duration="3000">
                                        <img src={avatar3} alt="wrapkit" className="img-fluid rounded-circle" />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <div className="pt-2">
                                            <h5 className="mt-4 font-weight-medium mb-0">Sophie Martin </h5>
                                            <h6 className="subtitle mb-3">Directrice Marketing</h6>
                                            <p>Avec plus de 10 ans d'expérience dans l'industrie de la beauté, Sophie apporte une expertise précieuse de stratégie marketing. </p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            {/* Répétez la structure similaire pour les autres membres de l'équipe */}
                            <div className="col-lg-3 mb-4">
                                <div className="row">
                                    <div className="col-md-12" data-aos="zoom-in" data-aos-duration="3000">
                                        <img src={avatar} alt="wrapkit" className="img-fluid rounded-circle" />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <div className="pt-2">
                                            <h5 className="mt-4 font-weight-medium mb-0">Alexandra Dupont</h5>
                                            <h6 className="subtitle mb-3">Responsable Recherche & Développement</h6>
                                            <p>Alexandra est une scientifique chevronnée avec une passion pour la formulation de produits de beauté de haute qualité. </p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-3 mb-4">
                                <div className="row">
                                    <div className="col-md-12" data-aos="zoom-in" data-aos-duration="3000">
                                        <img src={avatar1} alt="wrapkit" className="img-fluid rounded-circle" />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <div className="pt-2">
                                            <h5 className="mt-4 font-weight-medium mb-0">Camille Leclerc</h5>
                                            <h6 className="subtitle mb-3">Service Clientèle</h6>
                                            <p>Toujours souriante et prête à aider, elle est là pour répondre à toutes vos questions et vous guider dans votre expérience d'achat avec nous.</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-3 mb-4">
                                <div className="row">
                                    <div className="col-md-12" data-aos="zoom-in" data-aos-duration="3000">
                                        <img src={avatar2} alt="wrapkit" className="img-fluid rounded-circle" />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <div className="pt-2">
                                            <h5 className="mt-4 font-weight-medium mb-0">Élodie Dubois</h5>
                                            <h6 className="subtitle mb-3">Responsable Logistique</h6>
                                            <p>Élodie assure une gestion efficace de notre chaîne logistique, garantissant que nos produits arrivent à destination en temps voulu et en parfait état.</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            <section>
  {/* FEEDBACK */}
  <div className="title2" id="feedBACK">
    <span style={{textDecoration: 'underline'}}>Donnez votre avis</span>
    <div className="shortdesc2">
      <p>Éclairons nos esprits avec vos pensées !</p>
    </div>
  </div>

  <div className="feedbox">
    <div className="feed">
      <form action="mailto:rimbelabadia123rim@gmail.com" method="post" encType="text/plain">
        <label>Votre nom et prénom</label><br />
        <input type="text" name="" className="fname" required /><br />
        <label>Email</label><br />
        <input type="email" name="mail" required /><br />
        <label>Informations additionnelles</label><br />
        <textarea name="additional" /><br />
        <button type="submit" id="csubmit" style={{ marginTop: '1%' }}>Envoyer le message</button>
      </form>
    </div>
  </div>
</section>

            <footer>
                <div className="footer-container">
                    <div className="left-col">
                        <img src={ladies2} style={{ width: '200px' }} />
                        <div className="logo"></div>
                        <div className="social-media">
                            <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
                            <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
                            <a href="#"><img src={twitterIcon} alt="Twitter" /></a>
                            <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
                            <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
                        </div>
                        <br />
                        <p className="rights-text">Copyright © 2024, Created by xx, EMSI.</p>
                      
                        <p><img src={locationIcon} /> Marrakech, Maroc <br />
                            <img src={phoneIcon} /> +212 00 00 00 <br /><img src={mailIcon} /> emailexmpl@gmail.com</p>
                    </div>
                    <div className="right-col">
                        <h1 style={{ color: '#fff' }}>Recevez nos actualités</h1>
                        <div className="border"></div><br />
                        <p>Entrez votre email pour restez informé !</p>
                        <form className="newsletter-form">
                            <input className="txtb" type="email" placeholder="Tapez votre Email" />
                            <input className="btn" type="Submit" value="Envoyer" />
                        </form>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Home;
