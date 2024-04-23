"use client";

import React, { useState, useEffect } from 'react'
import { getAllUsers } from '@/lib/data';


export default function page() {

    const [voices, setVoices] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await getAllUsers();
                setVoices(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchData();
    }, []);


    return (
        <>
            {voices.map((v) => (
                <article className='border hover:border-black transition-all w-[120px] py-10 px-2'>
                    <h1 className='text-center text-xl font-bold'>{v.firstName}</h1>
                    <p className='text-center'>{v.color}</p>
                </article>
            ))}
        </>
    )
}
