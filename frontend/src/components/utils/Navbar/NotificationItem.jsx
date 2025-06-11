export default function NotificationItem({ item, isNew }) {
    return (
        <li>
            <a className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span className="flex-1 ms-3 whitespace-nowrap">{item}</span>
                {isNew &&
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">New</span>
                }
            </a>
        </li>
    )
}