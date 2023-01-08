import React from 'react';
import GoogleLogin from 'react-google-login'
import {useNavigate} from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'

import logo from '../assets/logowhite.png'
import background from '../assets/background.jpg'

import { gapi } from "gapi-script"

import {client} from '../client'

window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        plugin_name: "sharemeup"
})})

export const Login = () => {
    const navigate = useNavigate()

    const responseGoogle = async (response) => {
        try {

            console.log(response)
    
            localStorage.setItem('user', JSON.stringify(response?.profileObj))
    
            const {name, googleId, imageUrl} = response.profileObj
    
            const doc = {
                _id: googleId, //we use the underscore _ for sanity to recognise which document we are creating
                _type: 'user',
                userName: name,
                image: imageUrl
            }
            console.log('Try')
            
            await client.createIfNotExists(doc)
            navigate('/', {replace: true})

            console.log('done')
        }
        catch (err) {
            console.error(err)
        }
        
    }
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <img src={background} alt="background" className="w-full h-full object-cover"/>
            </div>
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                <div className="p-5 flex flex-row">
                    <img src={logo} width="130px" alt="logo" />
                    <p className="text-2xl text-red-500 ml-2">Up</p>
                </div>

                <div className="shadow-2xl">
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                        render={(renderProps) => (
                            <button
                                type="button"
                                className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <FcGoogle className="mr-4" /> Sign in with Google
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy="single_host_origin"
                    />
                </div>
            </div>
        </div>
    )
}