import React, {useState} from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { client } from '../client'
import { Spinner } from './Spinner'

import { categories } from '../utils/data'

export const CreatePin = ({user}) => {
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [destination, setDestination] = useState('')
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState(null)
    const [category, setCategory] = useState(null)
    const [imageAsset, setImageAsset] = useState(null)
    const [wrongImageType, setWrongImageType] = useState(false)

    const navigate = useNavigate()

    const uploadImage = (e) => {
        const selectedFile = e.target.files[0]

        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
            setWrongImageType(false)
            setLoading(true)

            client.assets
            .upload('image', selectedFile, { contentType: selectedFile.type, fileName: selectedFile.name})
            .then((document) => {
                setImageAsset(document)
                setLoading(false)
            })
            .catch((err) => console.error(err))
        }
        else {
            setWrongImageType(true)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:4/5">
            {fields && (
                <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill in all the fields</p>
            )}
            <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
                <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
                    <div className='flex justify-center items-center flex-col border-dotted border-gray-300 p-3 w-full h-420'>
                        {loading && <Spinner />}
                        {wrongImageType && <p>Wrong image type</p>}
                        {!imageAsset ? (
                            <label>
                                <div className='flex flex-col items-center justify-center h-full'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='font-bold text-2xl'>
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className='text-lg'>Click to upload</p>
                                    </div>
                                    <p className='mt-32 text-gray-400'>
                                        Use high-quality JPG, SVG, PNG, GIF less than 20 MB
                                    </p>
                                </div>
                                <input 
                                    type="file"
                                    onChange={uploadImage}
                                    name="upload-image"
                                    className='w-0 h-0'
                                />
                            </label>
                        ):(
                            <p>Something</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
