export default function DataRow({dataType, dataVal}) {
    const keyValPairCss = "w-full my-2 flex flex-col justify-left"

    return (
        <div className={keyValPairCss}>
            <label className='text-sm text-gray-500 mb-1'>{dataType}</label>
            <label className='text-lg text-justify text-black dark:text-gray-200'>{dataVal}</label>
        </div>
    )
}