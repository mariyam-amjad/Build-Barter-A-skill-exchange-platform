import { useState, useEffect } from 'react'
import Axios from 'axios'
import UserListItem from './UserListItem'
import { useAlert } from '../../utils/AlertProvider'
import PageHeading from '../../utils/PageHeading'
import { useLoading } from '../../utils/LoadingProvider'

export default function Matches() {
  const [matches, setMatches] = useState([])
  const { alert, setAlert } = useAlert()
  const { setIsLoading } = useLoading()

  useEffect(() => {
    async function getMatches() {
      setIsLoading(true)
      try {
        const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}user/matches`)
        if (response.status === 200) {
          console.log(response.data)
          setAlert({
            message: "Fetch successful.",
            type: "success"
          })
          setMatches(response.data)
        }
        else if(response.status === 201) {
          setMatches([])
        }
      } catch (err) {
        console.log(`${err.message}`)
        setAlert({
          message: "Error fetching matches."
        })
      }
      setIsLoading(false)
    }

    getMatches()
  }, [])

  return (
    <div className='flex item-center justify-center w-full min-h-96'>
      <div className='max-w-xl flex flex-col my-5'>
        <PageHeading>Matches</PageHeading>
        <div className="w-full min-w-64 border-2 border-blue-600 dark:border-blue-500 rounded-lg shadow mb-5 p-5 overflow-hidden bg-slate-200 dark:bg-gray-900">
          <ul className="min-w-96 divide-y divide-gray-200 dark:divide-gray-700">
            {matches.length > 0 ? (
              matches.map((user, index) => (
                <UserListItem key={index} user={user} />
              ))
            ) : (
              <div className=' text-gray-900 dark:text-white'>
                <li className="text-center py-4">No matches yet  : (</li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}