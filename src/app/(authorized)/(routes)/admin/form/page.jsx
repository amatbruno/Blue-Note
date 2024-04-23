"use client";

import React, { useState, useEffect } from 'react'
import { getAllUsers } from '@/lib/data';
import Draggable from '@/components/layout/admin/positions/Draggable';


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
        <main>
            <section className='flex justify-center items-end'>
                ESCENARIO
            </section>

            <section className='flex justify-center items-end gap-5'>
                {voices.map((v) => (
                    <Draggable voiceName={v.firstName} voiceColor={v.color} />
                ))}
            </section>
        </main>
    )
}
