import {
  FaCoffee,
  FaLeaf,
  FaAward,
  FaCheckCircle
} from "react-icons/fa";

import "./About.css";


export default function About(){

  const points = [
    {
      icon:<FaCoffee />,
      title:"Premium Coffee Beans",
      text:"Carefully selected beans roasted to perfection."
    },

    {
      icon:<FaLeaf />,
      title:"Natural Ingredients",
      text:"Fresh and high quality ingredients in every cup."
    },

    {
      icon:<FaAward />,
      title:"Expert Craftsmanship",
      text:"Created by skilled baristas with passion."
    }
  ];


  return(

    <section className="about" id="about">

      <div className="about-container">


        <div className="about-image">

          <img
            src="/images/about.jpeg"
            alt="Coffee Making"
            loading="lazy"
          />


          <div className="experience-card">

            <h2>
              12+
            </h2>

            <span>
              Years Experience
            </span>

          </div>


        </div>



        <div className="about-content">


          <span className="about-tag">
            About Brew Haven
          </span>


          <h2>
            More Than Coffee,
            <br />
            It's An Experience
          </h2>


          <p>
            At Brew Haven, we believe every cup tells a story.
            From selecting premium beans to carefully crafting
            each beverage, our goal is to deliver an unforgettable
            coffee experience.
          </p>



          <div className="about-points">


          {
            points.map((item,index)=>(

              <div 
                className="about-point"
                key={index}
              >

                <div className="point-icon">
                  {item.icon}
                </div>


                <div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>


              </div>

            ))
          }


          </div>



          <button className="about-btn">

            <FaCheckCircle />

            Discover More

          </button>


        </div>


      </div>


    </section>

  );

}