import {
  FaCoffee,
  FaArrowRight
} from "react-icons/fa";

import "./CTA.css";


export default function CTA(){

  return(

    <section className="cta">


      <div className="cta-overlay"></div>


      <div className="cta-container">


        <div className="cta-icon">
          <FaCoffee />
        </div>


        <h2>
          Your Perfect Coffee
          <br />
          Moment Awaits
        </h2>


        <p>
          Visit Brew Haven and experience premium coffee,
          handcrafted with passion and perfection.
        </p>



        <div className="cta-buttons">


          <button className="cta-primary">

            Reserve Table

            <FaArrowRight />

          </button>



          <button className="cta-secondary">

            Explore Menu

          </button>


        </div>


      </div>


    </section>

  );

}