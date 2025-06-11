import { React, useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DataRow from './DataRow'
import { useUser } from '../../utils/UserProvider'
import { defaultUser } from '../../utils/defaultUser'
import { useAlert } from '../../utils/AlertProvider'
import SkillRow from './SkillRow'
import PageHeading from '../../utils/PageHeading'
import { useLoading } from '../../utils/LoadingProvider'

Axios.defaults.withCredentials = true


export default function Profile() {
    const { userData, setUserData } = useUser()
    const navigate = useNavigate()
    const fieldsNotToDisplay = ['notifications', 'matches']
    const { alert, setAlert } = useAlert()
    const { isLoading, setIsLoading} = useLoading()

    useEffect(() => {
        const handleFetch = async () => {
            setIsLoading(true)
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}user/profile`)

                if (response.status === 200) {
                    console.log('Profile fetched successfully:', response.data)
                    setUserData({
                        ...userData,
                        ...response.data
                    })
                } else if (response.status === 300) {
                    console.log('Token is invalid or expired.')
                    setAlert({
                        message: "Invalid token."
                    })
                } else {
                    console.log('Fetch not working')
                    setAlert({
                        message: "Couldn't fetch profile."
                    })
                }
                setIsLoading(false)
            } catch (error) {
                console.error('Fetching profile failed:', error.message)
                setAlert({
                    message: "Fetching profile failed",
                    type: "warning"
                })
                setUserData({ ...defaultUser })
                console.log('Redirecting to login page.')
                navigate('/user/login')
                setIsLoading(false)
            }
            setIsLoading(false)
        }

        handleFetch()
    }, [])


    useEffect(() => {
        console.log('Updated userData:', userData);
    }, [userData])


    function handleClick() {
        navigate('/user/profile-update')
    }

    return (
        <div className="flex items-center justify-center w-full">
            
            <div className='flex flex-col my-5'>

                <PageHeading>Profile</PageHeading>

                <div className="w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <div className="flex flex-col items-center p-10">

                        <h1 className="text-right mb-1 text-xl font-medium text-gray-900 dark:text-white w-full">{`@ ${userData.username.toLowerCase()}`}</h1>


                        <div className="flex flex-col items-center p-5">
                            {Object.keys(userData).map((myKey, itr) => {
                                if (!fieldsNotToDisplay.includes(myKey)) {
                                    if (myKey === 'skills' || myKey === 'interests') {
                                        return <SkillRow key={itr} dataType={myKey} dataVal={userData[myKey]} />
                                    } else {
                                        return <DataRow key={itr} dataType={myKey} dataVal={userData[myKey]} />
                                    }
                                }
                            })}
                        </div>

                        <button onClick={handleClick} className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-7 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>✏️ EDIT</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
