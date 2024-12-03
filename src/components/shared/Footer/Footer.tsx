import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-[#1b1b1b] text-white grid grid-cols-1  md:grid-cols-5 gap-8 px-14 py-8">
      <div className=" space-y-6">
        <div className="flex items-center]">
          {/* <Image
            width={120}
            height={120}
            src="/Images/logo.png"
            alt="logo"
            className="bg-none w-[80px]"
          /> */}
          <p className="dancing-style text-3xl  text-white">
            Floral Radiance
          </p>
        </div>
        <p>
          Lorem Khaled Ipsum is a major key to success. To be successful you’ve
          got to work hard you’ve got to make it.
        </p>
        <ul className="flex gap-4">
          <li className="social-media-icon-style">
            <FaFacebookF />
          </li>
          <li className="social-media-icon-style">
            <FaFacebookF />
          </li>
          <li className="social-media-icon-style">
            <FaFacebookF />
          </li>
        </ul>
      </div>
      <div className=" space-y-6">
        <h1 className="text-2xl font-bold">Information</h1>
        <ul className=" space-y-1">
          <li className=" link-style">Our Company</li>
          <li className=" link-style">Contact Us</li>
          <li className=" link-style">Our Services</li>
          <li className=" link-style">Why We?</li>
        </ul>
      </div>
      <div className=" space-y-6">
        <h1 className="text-2xl font-bold">Quicklink</h1>
        <ul className=" space-y-1">
          <li className=" link-style">About</li>
          <li className=" link-style">Contact</li>
          <li className=" link-style">Blog</li>
          <li className=" link-style">Cart</li>
          <li className=" link-style">Careers</li>
        </ul>
      </div>
      <div className=" space-y-6">
        <h1 className="text-2xl font-bold">Support</h1>
        <ul className=" space-y-1">
          <li className=" link-style">Online Support</li>
          <li className=" link-style">Shipping Policy</li>
          <li className=" link-style">Return Policy</li>
          <li className=" link-style">Privacy Policy</li>
          <li className=" link-style">Terms of Service</li>
        </ul>
      </div>
      <div className=" space-y-6">
        <h1 className="text-2xl font-bold">See Information</h1>
        <p>
          123, ABC, Road ##, Main City, Your address goes here. Phone: 01234 567
          890 Email: https://example.com
        </p>
      </div>
    </div>
  );
};

export default Footer;
