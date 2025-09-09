import React, { useState, useEffect } from "react";
import { SquareLoader } from "react-spinners";




const ShimmerUI = ({ isLoading }) => {


    if (!isLoading) return null;



    return (
        <>
            <SquareLoader color="#fff7f7" size={100} />
        </>
    );
};

export default ShimmerUI;

// Inject styles
// if (typeof document !== 'undefined') {
//     const styleSheet = document.createElement("style");
//     styleSheet.textContent = styles;
//     document.head.appendChild(styleSheet);
// }

