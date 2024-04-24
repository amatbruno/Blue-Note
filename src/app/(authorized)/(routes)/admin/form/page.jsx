"use client";

import React, { useState, useEffect } from 'react'
import { getAllUsers } from '@/lib/data';
import Draggable from '@/components/layout/admin/positions/Draggable';
import Droppable from '@/components/layout/admin/positions/Droppable';

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

    const handleDrop = (e) => {
        e.preventDefault();
        const voiceName = e.dataTransfer.getData('text/plain');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    return (
        <main className='flex flex-col justify-center m-auto w-[1000px] items-center h-[600px] border'>
            <h1 className='text-2xl font-bold py-10'>ESCENARIO</h1>
            <section className='flex justify-center items-end gap-5'>
                {voices.map((index) => (
                    <Droppable
                        key={index}
                        id={`droppable-${index}`}
                        handleDrop={(e) => handleDrop(e, index)}
                        handleDragOver={handleDragOver}
                    />
                ))}
            </section>

            <section className='flex justify-center items-end gap-5 mt-10'>
                {voices.map((v) => (
                    <Draggable voiceName={v.firstName} voiceColor={v.color} />
                ))}
            </section>
        </main>
    )
}
