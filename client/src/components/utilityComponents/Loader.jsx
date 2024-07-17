import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { selectLoader } from '../../slices/loaderSlice'

function Loader() {
    const loader = useSelector(selectLoader)
    return (
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color= "#f9a109"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={loader}
            />
    )
}

export default Loader