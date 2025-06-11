import UserProfileCard from "./UserProfileCard";
import Axios from 'axios'
import { defaultUser } from "../utils/defaultUser";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../utils/AlertProvider'
import { useLoading } from "../utils/LoadingProvider";

Axios.defaults.withCredentials = true

export default function Swipe() {
    const [currProfile, setCurrProfile] = useState({ ...defaultUser })
    const [potentials, setPotentials] = useState([])
    const [index, setIndex] = useState(-1)
    const navigate = useNavigate()
    const { alert, setAlert } = useAlert()
    const { isLoading, setIsLoading} = useLoading()

    function showNext() {
        console.log(`index = ${index}, list length = ${potentials.length}`)
        console.log("Show next :")
        if (potentials.length === 0) {
            console.log("Potential matches list is empty.")
            setCurrProfile(defaultUser)
        }
        else if (index + 1 === potentials.length) {
            console.log("Reached end of list.")
            setAlert({
                message: "Reached end of list.",
                type: "success"
            })
            setIndex(-1)
            setCurrProfile(defaultUser)
            navigate('/user/profile')
        }
        else {
            console.log(`Setting card to next profile : ${potentials[index + 1].username}`)
            setCurrProfile(potentials[index + 1])
            setIndex(index + 1)
        }
    }

    useEffect(() => {
        async function handleFetch() {
            setIsLoading(true)
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}swipe`)

                if (response.status === 200) {
                    console.log("response data : ", response.data)
                    setPotentials(response.data.potentialMatchesBySkills)
                }
                else if (response.status === 300) {
                    console.log('Redirecting to login page.')
                    setAlert({
                        message: "Redirecting to login page."
                    })
                    navigate('/user/login')
                }
                else {
                    console.log(response.status, ' Error fetching potential matches.')
                    setAlert({
                        message: "Error fetching potential matches."
                    })
                }
            } catch (err) {
                console.error('Fetching profile failed :', err.message)
                setAlert({
                    message: "Unhandled error."
                })
            }
            setIsLoading(false)
        }

        handleFetch()
    }, [])


    useEffect(() => {
        console.log("Potentials updated : ", potentials)
        navigate('/swipe')
        showNext()
    }, [potentials])


    return (
        <div className="flex items-center justify-center">
            {
                potentials.length > 0 ?
                    <UserProfileCard currProfile={currProfile} showNext={showNext} />
                    :
                    <div className="flex items-center justify-center h-screen text-center text-gray-500 dark:text-gray-400 py-4">You have run out of potential matches ! Come again later or Update you skills & interests.</div>
            }
        </div>
    )
}