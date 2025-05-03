import Image from "next/image"


const HeroCards = ({activeIndex}) => {
    return (
        <div className=" flex flex-col overflow-hidden bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl transition-all duration-300 will-change-transform hover:shadow-lg hover:-translate-y-1 hover:z-10">
            <a href="#" className="flex shrink-0 aspect-w-4 aspect-h-3">
                <img
                    className="object-cover w-full h-60 transition-all duration-200 transform group-hover:scale-110"
                    src={`/assets/images/hero-${activeIndex + 1}.jpg`}
                    alt={`image-${activeIndex + 1}`}
                />
                
            </a>
            <div className="flex-1 px-4 py-5 sm:p-6">
                <a href="#">
                    <p className="text-lg font-bold text-gray-900">
                        Lorem ipsum dolor sit amet
                    </p>
                    <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </a>
            </div>

            <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900"><a href="#" title="" className=""> John Doe </a></p>
                        <span className="text-sm font-medium text-gray-900">•</span>
                        <p className="text-sm font-medium text-gray-900">7 Mins Read</p>
                    </div>
                    <a href="#" title="" className="" role="button">
                        <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline></svg
                        >
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HeroCards



{/* // <div className="flex items-center justify-center mt-2 space-x-5">
//     {[...Array(totalCards)].map((_, i) => (
//         <div
//             key={i}
//             className={`w-16 h-[3px] rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-gray-900' : 'bg-gray-300'
//                 }`}
//         ></div>
//     ))}
// </div> */}