import { jwtDecode } from 'jwt-decode'
import Axios from 'axios'

export const checkToken = async () => {
    try {
        const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}verifytoken`)
        if (response.status === 200) {
            return true
        }
    } catch (err) {
        console.log('Issues verifying token in frontend :', err.message)
    }
    return false
}

// export function checkToken() {
//     const decodedToken = decodeToken()
//     if (decodedToken) {
//         console.log("decoded token : ", decodedToken)
//         return true  // user is logged in
//     } else {
//         console.warn('No valid token found')
//         return false  // user is logged out
//     }
// }


// function decodeToken() {
//     const token = getCookie('token')
//     if (!token) {
//         return null
//     }
//     try {
//         const decodedToken = jwtDecode(token)
//         return decodedToken
//     } catch (error) {
//         console.error('Invalid token:', error.message)
//         return null
//     }
// }


// const getCookie = (name) => {
//     const value = `; ${document.cookie}`
//     console.log(`document.cookie : ${value}`)
//     const parts = value.split(`; ${name}=`)
//     if (parts.length === 2) return parts.pop().split(';').shift()
//     return null
// }