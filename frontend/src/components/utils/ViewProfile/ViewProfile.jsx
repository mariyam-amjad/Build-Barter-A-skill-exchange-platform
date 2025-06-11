import { React, useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import DataRow from './DataRow'
import { defaultUser } from './defaultUser'
import { useAlert } from '../../utils/AlertProvider'
import SkillRow from './SkillRow'
import PageHeading from '../../utils/PageHeading'
import { useLoading } from '../../utils/LoadingProvider'

Axios.defaults.withCredentials = true


export default function ViewProfile({ children }) {
    const [userData, setUserData] = useState(defaultUser)
    const navigate = useNavigate()
    const { alert, setAlert } = useAlert()
    const { isLoading, setIsLoading } = useLoading()
    const { username } = useParams()

    useEffect(() => {
        console.log("username :" , username)
        const handleFetch = async () => {
            setIsLoading(true)
            if (children) {
                setUsername(children)
                navigate(`/${username}`)
            }
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}${username}`, {
                    username: username
                })

                if (response.status === 200) {
                    console.log('Profile fetched successfully:', response.data)
                    setUserData({
                        ...userData,
                        ...response.data
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
                console.log('Redirecting to home page.')
                navigate('/home')
                setIsLoading(false)
            }
            setIsLoading(false)
        }

        if(username)
            handleFetch()
    }, [])


    useEffect(() => {
        console.log('Updated userData:', userData);
    }, [userData])


    return (
        <div className="flex items-center justify-center w-full">

            <div className='flex flex-col my-5'>

                <PageHeading>{`@ ${userData.username.toLowerCase()}`}</PageHeading>

                <div className="w-full max-w-lg border-2 border-blue-600 dark:border-blue-500 rounded-lg shadow bg-slate-200 dark:bg-gray-900 mb-5">
                    <div className="flex flex-col items-center p-10">

                        <div className="flex flex-col items-center p-5">
                            {Object.keys(userData).map((myKey, itr) => {
                                if (myKey === 'skills' || myKey === 'interests') {
                                    return <SkillRow key={itr} dataType={myKey} dataVal={userData[myKey]} />
                                } else {
                                    return <DataRow key={itr} dataType={myKey} dataVal={userData[myKey]} />
                                }
                            })}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
