import { React, useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DataRow from './DataRow'
import { useUser } from '../../utils/UserProvider'
import { defaultUser } from '../../utils/defaultUser'
import { useAlert } from '../../utils/AlertProvider'
import SkillRowEdit from './SkillRowEdit'
import PageHeading from '../../utils/PageHeading'
import { useLoading } from '../../utils/LoadingProvider'

Axios.defaults.withCredentials = true

export default function ProfileUpdate() {
    const { userData, setUserData } = useUser()
    const [preSaveUserData, setPreSaveUserData] = useState({ ...userData })
    const { alert, setAlert } = useAlert()
    const { setIsLoading } = useLoading()
    const navigate = useNavigate()
    const fieldsNotToDisplay = ['notifications', 'matches']

    useEffect(() => {
        const handleFetch = async () => {
            setIsLoading(true)
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}user/profile`)

                if (response.status === 200) {
                    console.log('Profile fetched successfully:', response.data)
                    // Set fresh user data from backend
                    setUserData(response.data)
                    setPreSaveUserData(response.data)
                } else {
                    console.log('Fetch not working')
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    console.log('Token is invalid or expired.')
                } else {
                    console.error('Fetching profile failed:', error.response?.data || error.message)
                }
                setUserData({ ...defaultUser })
                navigate('/user/login')
            }
            setIsLoading(false)
        }

        handleFetch()
    }, []) // only once on mount

    // Removed second useEffect to avoid resetting user edits on userData change

    const handleClick = async () => {
        try {
            console.log("data to backend",preSaveUserData)
            const response = await Axios.put(`${import.meta.env.VITE_BACKEND_URL}user/profile-update`, preSaveUserData)
            console.log(response)
            if (response.status === 200) {
                console.log("Updated profile successfully.")
                setAlert({
                    message: "Updated profile successfully.",
                    type: 'success'
                })
                // Update context with saved data
                setUserData(preSaveUserData)
                navigate('/user/profile')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            setAlert({
                message: "Error updating profile."
            })
        }
    }

    return (
        <div className="flex items-center justify-center w-full">

            <div className='flex flex-col my-5'>

                <PageHeading>Edit Profile</PageHeading>

                <div className="w-full max-w-2xl border-2 border-blue-600 dark:border-blue-500 rounded-lg shadow bg-slate-200 dark:bg-gray-900 mb-5">
                    <div className="flex flex-col items-center p-10">

                        {console.log('userData keys:', Object.keys(userData))}
                        <div className="flex flex-col items-center p-5">
                            {Object.keys(userData).map((myKey, itr) => {
                                if (myKey === 'skills' || myKey === 'interests') {
                                    return <SkillRowEdit
                                        key={itr}
                                        dataType={myKey}
                                        dataVal={userData[myKey]}
                                        preSaveUserData={preSaveUserData}
                                        setPreSaveUserData={setPreSaveUserData}
                                    />
                                } else if (!fieldsNotToDisplay.includes(myKey)) {
                                    return <DataRow
                                        key={itr}
                                        dataType={myKey}
                                        dataVal={userData[myKey]}
                                        preSaveUserData={preSaveUserData}
                                        setPreSaveUserData={setPreSaveUserData}
                                    />
                                }
                                return null
                            })}
                        </div>

                        <button onClick={handleClick} className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-7 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>💾 SAVE</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
