import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import {MasonryLayout} from './MasonryLayout'
import {Spinner} from './Spinner'

export const Feed = () => {
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState(null)
    const {categoryId} = useParams()

    useEffect(() => {
        setLoading(true)
        
        if(categoryId) {
            const query = searchQuery(categoryId)
    
            client.fetch(query)
            .then((data) => {
                // console.log(data)
                setSearchResults(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })

            return
        }

        client.fetch(feedQuery)
        .then((data) => {
            // console.log(data)
            setSearchResults(data)
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setLoading(false)
        })
    }, [categoryId])

    if (loading) return <Spinner message={`We are adding new ${'ideas'} to your feed...`} />

    if(!searchResults?.length) return <h2>No pins available</h2>
    return (
        <div>
            {searchResults && <MasonryLayout pins={searchResults} />}
        </div>
    )
}
