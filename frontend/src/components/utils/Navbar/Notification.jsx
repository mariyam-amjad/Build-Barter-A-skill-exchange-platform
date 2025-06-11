import {useState, useEffect} from 'react'
import NotifPanel from './NotifPanel'
import { useUser } from '../../utils/UserProvider'
import { checkToken } from '../checkToken.js'
import Axios from 'axios'
import { defaultUser } from '../defaultUser'
import { useAlert } from '../AlertProvider'
import { useLoading } from '../LoadingProvider.jsx'

export default function Notification() {
    const [panelShown, setPanelShown] = useState(false)
    const {userData, setUserData} = useUser()
    const {alert, setAlert} = useAlert()
    const { setIsLoading } = useLoading()


    useEffect(() => {
        const fetchNotifs = async() => {
            setIsLoading(true)
            try{
                if(checkToken()) {
                    const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}user/notifications`)
                    if(response.status === 200) {
                        setUserData({...userData, ...response.data})
                    }
                    else {
                        setAlert({
                            message: "Unable to fetch notifications."
                        })
                    }
                }
            } catch (err) {
                console.error("Unable to fetch notifications.")
                setAlert({
                    message: "Unable to fetch notifications."
                })
            }
            setIsLoading(false)
        }

        fetchNotifs()
    }, [])


    function handleClick(){
        setPanelShown((panelShown) => !panelShown)
    }


    return (
        <>
            {/* Notif icon */}
            <button onClick={handleClick} className='text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 pt-3 mr-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </button>

            {/* Panel */}
            {panelShown && <NotifPanel userData={userData} handleClick={handleClick}/>}
            
        </>
    )
}