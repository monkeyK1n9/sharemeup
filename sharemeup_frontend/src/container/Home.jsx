import React, {useState, useRef, useEffect} from 'react';
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes, useNavigate} from 'react-router-dom'

import { Sidebar, UserProfile } from '../components';
import { Pins } from './Pins';
import {client} from '../client'
import logo from '../assets/logo.png'

import {userQuery} from '../utils/data'
import { fetchUser } from '../utils/fetchUser';

export const Home = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [user, setUser] = useState({})

    const scrollRef = useRef(null)
    const navigate = useNavigate()

    const userInfo = fetchUser()


    useEffect(() => {
        const query = userQuery(userInfo?.googleId)

        client.fetch(query)
        .then((data) => {
            // console.log(data)
            setUser(data[0])
        })
        .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])


    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={user && user}/>
            </div>

            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu 
                        fontSize={40} 
                        className="cursor-pointer"
                        onClick={() => setToggleMenu(!toggleMenu)}
                    />
                    <Link to='/'>
                        <div className="p-5 flex flex-row">
                            <img src={logo} width="130px" alt="logo" />
                            <p className="text-2xl text-red-500 ml-2">Up</p>
                        </div>
                    </Link>
                    <Link to={`/user-profile/${user?._id}`}>
                        <div className="p-5 flex flex-row">
                            <img src={user?.image} width="130px" alt="profile_image" />
                        </div>
                    </Link>
                </div>
                {toggleMenu && (
                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle 
                                fontSize={30}
                                className="cursor-pointer"
                                onClick={() => setToggleMenu(!toggleMenu)}
                            />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleMenu}/>
                    </div>
                )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/*" element={<Pins user={user && user} />} />
                </Routes>
            </div>
        </div>
    )
}