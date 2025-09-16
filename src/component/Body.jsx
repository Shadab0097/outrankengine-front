import { Outlet, useNavigate } from "react-router-dom"
// import NavBar from "./NavBar"
// import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
// import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import URLAnalyzer from "./URLAnalyzer"
import { addUser } from "../utils/userSlice"
import Navbar from "./Navbar"


const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedInUser = useSelector(store => store.user)


    const fetchUserData = async () => {
        if (loggedInUser) return
        try {
            const userData = await axios.get(BASE_URL + "profile", { withCredentials: true })
            // console.log(userData)
            if (userData.status === 200) {
                dispatch(addUser(userData.data))

                navigate('/')
            }

        } catch (err) {
            if (err.status === 401) {
                navigate('/login')
            }
            console.error(err.message)
        }

    }

    // const fetchUserData = async () => {
    //     if (loggedInUser) return

    //     try {
    //         // First, check if we have a token in localStorage
    //         const storedToken = localStorage.getItem('authToken');
    //         const storedUser = localStorage.getItem('user');

    //         if (storedToken) {
    //             // Set Authorization header for this request
    //             axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    //         }

    //         // Try to verify authentication (works with both cookies and headers)
    //         const response = await axios.get(BASE_URL + "profile", {
    //             withCredentials: true  // Keep this for cookie support
    //         });

    //         if (response.status === 200) {
    //             // Check if response has the expected format
    //             const userData = response.data.data || response.data;

    //             // Update Redux store
    //             dispatch(addUser(userData));

    //             // If we got the token from localStorage, make sure it's still set
    //             if (storedToken) {
    //                 localStorage.setItem('user', JSON.stringify(userData));
    //             }

    //             navigate('/');
    //         }

    //     } catch (err) {
    //         console.error('Auth check failed:', err);

    //         // Clear any stored authentication data
    //         localStorage.removeItem('authToken');
    //         localStorage.removeItem('user');
    //         delete axios.defaults.headers.common['Authorization'];

    //         // Navigate to login on authentication failure
    //         if (err.response?.status === 401 || err.response?.status === 403) {
    //             navigate('/login');
    //         }
    //     }
    // }

    useEffect(() => {
        fetchUserData()
    }, [])


    return (
        <>
            {/* <Navbar /> */}
            <URLAnalyzer />
        </>
    )
}


export default Body