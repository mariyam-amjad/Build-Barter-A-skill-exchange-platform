import { useEffect } from 'react'
import GetStartedBtn from './GetStartedBtn'
import { defaultUser } from '../utils/defaultUser'
import Axios from 'axios'
import { useAlert } from '../utils/AlertProvider'
import { checkToken } from '../utils/checkToken'
import { useUser } from '../utils/UserProvider'
import { useLoading } from '../utils/LoadingProvider'
import MainHeading from './MainHeading'
import RegtdUsers from './RegtdUsers'
import Slogan from './Slogan'

export default function Home() {
    const { alert, setAlert } = useAlert()
    const { userData, setUserData } = useUser()
    const { setIsLoading } = useLoading()

    useEffect(() => {
        const logoutPrevUser = async () => {
            if (checkToken()) {
                setIsLoading(true)
                const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`)
                if (response.status === 200) {
                    setUserData({ ...defaultUser })
                    console.log("Previous user logged out.")
                }
                setIsLoading(false)
            }
        }

        logoutPrevUser()
    }, [])

    return (
        <>
            <div className='flex flex-col select-none'>
                <div className='flex justify-center'>
                    <Slogan />
                </div>
                <div className='w-full justify-center flex items-center flex-col sm:flex-row'>
                    <div className='m-8'>
                        <MainHeading />
                    </div>
                    <div className='flex flex-col justify-center mt-8'>
                        <RegtdUsers />
                        <GetStartedBtn />
                    </div>
                </div>
            </div>
        </>
    )
}