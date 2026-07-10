import { FaStar, FaQuoteLeft } from "react-icons/fa";
import "./Testimonials.css";


export default function Testimonials(){

  const reviews = [

    {
      image:"/images/c1.jpeg",
      name:"Emily Johnson",
      review:
      "The best coffee experience I have ever had. The taste, aroma and ambience are perfect.",
      rating:"5.0"
    },

    {
      image:"/images/c2.jpeg",
      name:"Daniel Smith",
      review:
      "Amazing quality coffee with a premium feel. Every cup feels specially crafted.",
      rating:"4.9"
    },

    {
      image:"/images/c3.jpeg",
      name:"Sophia Williams",
      review:
      "Beautiful place, amazing flavours and wonderful service. Highly recommended.",
      rating:"5.0"
    }

  ];


  return(

    <section className="testimonials" id="reviews">

      <div className="testimonials-container">


        <div className="section-heading">

          <span>
            Customer Reviews
          </span>

          <h2>
            Loved By Coffee Lovers
          </h2>

          <p>
            Hear what our customers say about their Brew Haven experience.
          </p>

        </div>



        <div className="review-grid">


        {
          reviews.map((item,index)=>(

            <div 
              className="review-card"
              key={index}
            >

              <div className="quote-icon">
                <FaQuoteLeft />
              </div>


              <p>
                {item.review}
              </p>


              <div className="stars">

                {
                  [...Array(5)].map((_,i)=>(

                    <FaStar key={i}/>

                  ))
                }

                <span>
                  {item.rating}
                </span>

              </div>



              <div className="customer">

                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />

                <h3>
                  {item.name}
                </h3>

              </div>


            </div>

          ))
        }


        </div>


      </div>


    </section>

  );

}