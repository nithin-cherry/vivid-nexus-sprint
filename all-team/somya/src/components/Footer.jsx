import {
  FaCoffee,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

import "./Footer.css";


export default function Footer(){

  return(

   <footer className="footer" id="contact">


      <div className="footer-container">


        <div className="footer-brand">


          <div className="footer-logo">

            <div className="footer-icon">
              <FaCoffee />
            </div>

            <h2>
              Brew Haven
            </h2>

          </div>


          <p>
            Premium handcrafted coffee made with passion,
            quality beans and unforgettable flavours.
          </p>


          <div className="social-icons">

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

          </div>


        </div>




        <div className="footer-links">

          <h3>
            Quick Links
          </h3>

          <a href="#home">
            Home
          </a>

          <a href="#menu">
            Menu
          </a>

          <a href="#about">
            About
          </a>

          <a href="#reviews">
            Reviews
          </a>

        </div>




        <div className="footer-contact">

          <h3>
            Contact
          </h3>


          <p>
            <FaMapMarkerAlt />
            Kanpur, India
          </p>


          <p>
            <FaPhone />
            +91 98765 43210
          </p>


          <p>
            <FaEnvelope />
            hello@brewhaven.com
          </p>


        </div>




        <div className="footer-hours">

          <h3>
            Opening Hours
          </h3>


          <p>
            Monday - Friday
            <span>
              8:00 AM - 10:00 PM
            </span>
          </p>


          <p>
            Saturday - Sunday
            <span>
              9:00 AM - 11:00 PM
            </span>
          </p>


        </div>


      </div>




      <div className="footer-bottom">

        © 2026 Brew Haven. All Rights Reserved.

      </div>



    </footer>

  );

}