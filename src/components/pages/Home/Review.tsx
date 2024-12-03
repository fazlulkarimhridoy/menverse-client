

import Image from "next/image";

interface CustomerReviewsProps {
    img: string;
    review: string;
    name: string;
  }
const Review:React.FC<CustomerReviewsProps> = ({img,review,name}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4   h-[460px]">
            <div className="rounded-full w-[110px]"><Image src={img} className="rounded-full"  alt='avatar' width={110} height={0}></Image></div>
            
            <p className="max-w-[600px] text-center font-poppins  md:text-xl">{review}</p>
            <p className="text-lg text-pink-600 ">{name} - <span className="text-black">customer</span></p>
        </div>
    );
}

export default Review;
