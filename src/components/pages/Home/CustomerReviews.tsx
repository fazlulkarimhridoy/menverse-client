import { Carousel } from "antd";
import Review from "./Review";

// Define the type for the component props
// interface CustomerReviewsProps {
//   img: string;
//   review: string;
//   name: string;
// }

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#000000",
  lineHeight: "160px",
  textAlign: "center",
  background: "#fffff",
};

// Type the props in the functional component
const CustomerReviews = () => {
  return (
    <div className="customer-review bg-[#f7dfe6]">
      <header className="p-4">
        <p className=" font-great-vibes-regular text-2xl text-pink-600 text-center">
          We Love Our Clients
        </p>
        <p className="text-4xl text-center pt-4 font-poppins">
          WHAT THEY’RE SAYING
        </p>
      </header>

      <div className="text-black lg:px-20 ">
        <Carousel arrows className="text-black" infinite={false}>
          <div>
            <Review
              name="Himel"
              img="/Images/avatar2.jpg"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ratione! Necessitatibus, error at sequi reiciendis assumenda expedita illo impedit aliquid quia eum eaque ab enim eius a inventore molestias veniam!"
            ></Review>
          </div>
          <div>
            <Review
              name="Himel"
              img="/Images/avatar2.jpg"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ratione! Necessitatibus, error at sequi reiciendis assumenda expedita illo impedit aliquid quia eum eaque ab enim eius a inventore molestias veniam!"
            ></Review>
          </div>
          <div>
            <Review
              name="Himel"
              img="/Images/avatar2.jpg"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ratione! Necessitatibus, error at sequi reiciendis assumenda expedita illo impedit aliquid quia eum eaque ab enim eius a inventore molestias veniam!"
            ></Review>
          </div>
          <div>
            <Review
              name="Himel"
              img="/Images/avatar2.jpg"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ratione! Necessitatibus, error at sequi reiciendis assumenda expedita illo impedit aliquid quia eum eaque ab enim eius a inventore molestias veniam!"
            ></Review>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReviews;
