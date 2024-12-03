import Image from "next/image";
import RedRoses from "../../../assets/red-roses.jpg"
import RedTulips from "../../../assets/red-tulips.jpg"
import Tulips from "../../../assets/tulips.jpg"

const OfferSection = () => {
    return (
        <div className="my-5">
            <div className="flex flex-col md:flex-row items-center justify-around gap-5 mx-0 md:mx-2">
                <a className="relative block overflow-hidden group cursor-pointer">
                    <Image
                        className="w-[300px] 2xl:w-[800px] h-[200px] lg:w-[600px] lg:h-[250px] xl:h-[400px] 2xl:h-[500px] object-cover transition duration-700 group-hover:scale-110"
                        src={RedRoses}
                        width={600}
                        alt="1st-offer" />
                    <div className="absolute top-0 left-0 bg-black opacity-50 w-[300px] 2xl:w-[800px] h-[200px] lg:w-[600px] lg:h-[250px] xl:h-[400px] 2xl:h-[500px] object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute top-[35%] left-[30%] md:top-[35%] md:left-[25%] lg:top-[30%] lg:left-[22%] xl:top-[37%] 2xl:top-[45%] 2xl:left-[30%] flex flex-col gap-1 lg:gap-2 text-center text-white">
                        <h4 className="text-lg lg:text-xl xl:text-3xl font-normal">BIG RED ROSE</h4>
                        <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold">40% OFF</h2>
                    </div>
                </a>
                <a className="relative block overflow-hidden group cursor-pointer">
                    <Image
                        className="w-[300px] 2xl:w-[800px] h-[200px] lg:w-[600px] lg:h-[250px] xl:h-[400px] 2xl:h-[500px] object-cover transition duration-700 group-hover:scale-110"
                        src={RedTulips}
                        width={600}
                        alt="2nd-offer" />
                    <div className="absolute top-0 left-0 bg-black opacity-50 w-[300px] 2xl:w-[800px] h-[200px] lg:w-[600px] lg:h-[250px] xl:h-[400px] 2xl:h-[500px] object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute top-[35%] left-[30%] md:top-[35%] md:left-[25%] lg:top-[30%] lg:left-[22%] xl:top-[37%] 2xl:top-[45%] 2xl:left-[30%] flex flex-col gap-1 lg:gap-2 text-center text-white">
                        <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold">RED TULIP</h2>
                        <h4 className="text-lg lg:text-xl xl:text-3xl font-normal">UPTO 30% OFF</h4>
                    </div>
                </a>
                <a className="relative block overflow-hidden group cursor-pointer">
                    <Image
                        className="w-[300px] 2xl:w-[800px] h-[200px] lg:w-[600px] lg:h-[250px] xl:h-[400px] 2xl:h-[500px] object-cover transition duration-700 group-hover:scale-110"
                        src={Tulips}
                        width={600}
                        alt="3rd-offer" />
                    <div className="absolute top-0 left-0 bg-black opacity-50 w-[300px] 2xl:w-[800px] h-[200px] lg:w-[600px] lg:h-[250px] xl:h-[400px] 2xl:h-[500px] object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute top-[35%] left-[30%] md:top-[35%] md:left-[25%] lg:top-[30%] lg:left-[22%] xl:top-[37%] 2xl:top-[45%] 2xl:left-[30%] flex flex-col gap-1 lg:gap-2 text-center text-white">
                        <h4 className="text-lg lg:text-xl xl:text-3xl font-normal">TULIP FLOWER</h4>
                        <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold">30% OFF</h2>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default OfferSection;