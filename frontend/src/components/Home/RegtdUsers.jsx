import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useAlert } from '../utils/AlertProvider'

export default function RegtdUsers() {
    const [users, setUsers] = useState('⌛')
    const {alert, setAlert} = useAlert()

    useEffect(() => {
        const fetchRegtdUsers = async () => {
            try{
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}home`)

                if(response.status === 200) {
                    setUsers(response.data)
                    console.log("registered users : ", response.data)
                }
            } catch (err) {
                console.error("Couldn't fetch no. of registered users : ", err.message)
                setAlert({
                    message: "Couldn't fetch no. of registered users"
                })
            }
        }

        fetchRegtdUsers()
    }, [])

    return (
        <div className="flex justify-center items-center font-sans font-medium text-black dark:text-white text-md sm:text-xl">
            <span>Registered&nbsp;</span>
            <div className='text-blue-600 dark:text-blue-500 font-bold border-solid border-blue-600 dark:border-blue-500 rounded-lg border-2 px-1'>{users}</div>
            <span>&nbsp;users till now...</span>
        </div>
    )
}