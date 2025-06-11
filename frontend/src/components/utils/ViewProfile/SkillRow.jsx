export default function SkillRow({dataType, dataVal}) {
    const keyValPairCss = "w-full my-2 flex flex-col justify-left"

    return (
        <div className={keyValPairCss}>
            <label className='mb-3 text-sm text-gray-500'>{dataType}</label>
            <div className="flex flex-wrap">
                {dataVal.map((element, key) => {
                    return <label key={key} className='rounded-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2'>{element.name}</label>
                })}
            </div>
        </div>
    )
}