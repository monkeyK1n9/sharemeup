import React from 'react'
import {Circles} from 'react-loader-spinner'

export const Spinner = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <Circles
                color="#00BFFF"
                width={200}
                height={50}
                className="m-5"
            />

            <p className="text-lg text-center px-2">{message}</p>
        </div>
    )
}
