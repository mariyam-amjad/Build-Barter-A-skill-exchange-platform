import { bouncy } from 'ldrs'
import { useLoading } from './LoadingProvider'

export default function Loading() {
    const { isLoading, setIsLoading } = useLoading()

    bouncy.register()

    const blurStyle = {
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }

    return (
        <>
            {isLoading &&
                <div>
                    {/* blur screen */}
                    <div aria-hidden="true" className="fixed z-40 w-screen h-screen top-0 left-0" style={blurStyle}></div>

                    <div className='w-screen h-screen flex justify-center z-50 absolute'>
                        <div className='mt-60'>
                            <l-bouncy
                                size="60"
                                speed="1.75"
                                color="#3b82f6"
                            ></l-bouncy>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}