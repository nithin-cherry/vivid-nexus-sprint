import {
  FaStar,
  FaShoppingBag
} from "react-icons/fa";

import "./Menu.css";


export default function Menu() {


  const coffees = [

    {
      image:"/images/cappuccino.jpeg",
      name:"Chocolate Mocha",
      description:"Premium coffee with rich chocolate flavour.",
      price:"₹290",
      rating:"4.9"
    },

    {
      image:"/images/americano.jpeg",
      name:"Iced Americano",
      description:"Smooth espresso with chilled water and refreshing flavour.",
      price:"₹180",
      rating:"4.8"
    },
 {
      image:"/images/affogato.jpeg",
      name:"Affogato",
      description:"A delightful dessert coffee with a scoop of vanilla ice cream.",
      price:"₹250",
      rating:"4.9"
    },
    {
      image:"/images/latte.jpeg",
      name:"Velvet Latte",
      description:"Silky milk combined with perfectly brewed espresso.",
      price:"₹240",
      rating:"4.9"
    },

    {
      image:"/images/macchiato.jpeg",
      name:"Caramel Macchiato",
      description:"A sweet caramel touch with bold espresso notes.",
      price:"₹280",
      rating:"5.0"
    },

    {
      image:"/images/mocha.jpeg",
      name:"Classic Cappuccino",
      description:"Rich espresso blended with creamy steamed milk foam.",
      price:"₹260",
      rating:"4.9"
    }

  ];



  return (

    <section className="menu" id="menu">

      <div className="menu-container">


        <div className="section-heading">

          <span>
            Our Menu
          </span>

          <h2>
            Signature Coffee Collection
          </h2>

          <p>
            Explore our handcrafted beverages prepared
            with premium ingredients.
          </p>

        </div>



        <div className="coffee-grid">


          {
            coffees.map((coffee,index)=>(

              <div 
                className="coffee-card"
                key={index}
              >


                <div className="coffee-image">

                  <img
                    src={coffee.image}
                    alt={coffee.name}
                    loading="lazy"
                  />


                </div>



                <div className="coffee-content">


                  <div className="coffee-rating">

                    <FaStar />

                    <span>
                      {coffee.rating}
                    </span>

                  </div>



                  <h3>
                    {coffee.name}
                  </h3>


                  <p>
                    {coffee.description}
                  </p>



                  <div className="coffee-bottom">


                    <h4>
                      {coffee.price}
                    </h4>


                    <button>

                      <FaShoppingBag />

                      Order

                    </button>


                  </div>


                </div>


              </div>

            ))
          }


        </div>


      </div>

    </section>

  );
}