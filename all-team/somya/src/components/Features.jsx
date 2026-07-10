
import {
  GiCoffeeBeans,
  GiCoffeeCup,
  GiSparkles,
  GiDeliveryDrone,
} from "react-icons/gi";

import "./Features.css";

export default function Features() {

  const features = [
    {
      icon: <GiCoffeeBeans />,
      title: "Fresh Coffee Beans",
      description:
        "Premium roasted beans selected carefully for rich aroma and unforgettable taste.",
    },

    {
      icon: <GiCoffeeCup />,
      title: "Expert Brewing",
      description:
        "Our skilled baristas craft every cup with precision and passion.",
    },

    {
      icon: <GiSparkles />,
      title: "Premium Quality",
      description:
        "Only the finest ingredients go into creating your perfect coffee experience.",
    },

    {
      icon: <GiDeliveryDrone />,
      title: "Fast Delivery",
      description:
        "Enjoy your favourite coffee delivered fresh and quickly at your doorstep.",
    },
  ];


  return (
    <section className="features" id="features">

      <div className="features-container">


        <div className="section-heading">

          <span>
            Why Choose Us
          </span>

          <h2>
            Crafted For Coffee Lovers
          </h2>

          <p>
            Experience premium coffee made with passion,
            quality beans and exceptional care.
          </p>

        </div>



        <div className="features-grid">

          {
            features.map((item,index)=>(

              <div 
                className="feature-card"
                key={index}
              >

                <div className="feature-icon">
                  {item.icon}
                </div>


                <h3>
                  {item.title}
                </h3>


                <p>
                  {item.description}
                </p>


              </div>

            ))
          }

        </div>


      </div>

    </section>
  );
}