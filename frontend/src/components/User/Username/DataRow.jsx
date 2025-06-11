export default function DataRow({dataType, dataVal}) {
    const keyValPairCss = "w-full flex justify-between my-2"

    return (
        <div className={keyValPairCss}>
            <label className='text-lg text-black dark:text-black font-bold mr-6'>{dataType}</label>
            <label className='text-lg text-gray-500 dark:text-gray-400 text-justify'>{dataVal}</label>
        </div>
    )
}