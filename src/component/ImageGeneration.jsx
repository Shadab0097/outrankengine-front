import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const ImageGeneration = ({ data }) => {
    // console.log(data.data)
    // const [images, setImages] = useState([]);
    // const [loading, setLoading] = useState(true);


    return (
        <div className="w-full min-h-screen bg-gray-50 px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                🚀 SEO Optimized Images
            </h1>

            {/* Loading Skeleton */}
            {/* {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="w-full h-60 bg-gray-200 animate-pulse rounded-2xl"
                        ></div>
                    ))}
                </div>
            ) : ( */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data?.map((img, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        <img
                            src={`${BASE_URL}${img.imageUrl}`}
                            alt={img.prompt}
                            className="w-full h-full object-cover"
                        />
                        <div className="p-4">
                            {/* <p className="text-sm text-gray-700 line-clamp-3">{img.prompt}</p> */}
                        </div>
                    </div>
                ))}
            </div>
            {/* )} */}

        </div>
    );
}


export default ImageGeneration