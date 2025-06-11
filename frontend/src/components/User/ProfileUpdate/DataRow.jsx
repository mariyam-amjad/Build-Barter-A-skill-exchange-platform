export default function DataRow({ dataType, dataVal, preSaveUserData, setPreSaveUserData }) {
    const keyValPairCss = "w-full flex justify-between my-3"

    function handleChange(event) {
        setPreSaveUserData({
            ...preSaveUserData,
            [dataType]: event.target.value
        })
    }

    return (
        <div className={keyValPairCss}>
            <label className='text-lg text-black dark:text-gray-200 font-bold mr-4'>{dataType}</label>
            {dataType === 'bio' ?
                <textarea className='min-h-36 w-80 w-min-64 px-2 py-0.5 border rounded-lg border-gray-400 text-lg text-gray-900' value={preSaveUserData[dataType]} onChange={handleChange} />
                :
                <input className='w-80 w-min-64 px-2 py-0.5 border rounded-lg border-gray-400 text-lg text-gray-900' value={preSaveUserData[dataType]} onChange={handleChange} />
            }
        </div>
    )
}