import maleAvatar from '../../../assets/avatar/male-default-avatar.png'
import { useNavigate, useParams } from 'react-router-dom'

export default function UserListItem({user}) {

    const navigate = useNavigate()

    function handleClick() {
        navigate(`/${user.username}`)
    }

    return (
        <li className="px-3 py-3 sm:py-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-4" onClick={handleClick}>
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={maleAvatar} alt={`avatar`} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{`@ ${user.username}`}</p>
                </div>
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {user.amount}
                </div> */}
            </div>
        </li>
    )
}