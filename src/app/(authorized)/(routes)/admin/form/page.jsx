import React, { useState, useEffect } from 'react';
import { getAllEvents, getAllUsers, insertUserLineup } from '@/lib/data';
import Draggable from '@/components/layout/admin/positions/Draggable';
import Droppable from '@/components/layout/admin/positions/Droppable';
import './app.css';

export default function Page() {
    const [voices, setVoices] = useState([]);
    const [events, setEvents] = useState([]);
    const [droppedItems, setDroppedItems] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await getAllUsers();
                setVoices(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        async function fetchEvents() {
            try {
                const eventsData = await getAllEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events: ', error);
            }
        }
        fetchData();
        fetchEvents();
    }, []);

    const handleDrop = async (e, index) => {
        e.preventDefault();
        const voiceName = e.dataTransfer.getData('text/plain');
        const voice = voices.find(v => v.firstName === voiceName);

        if (voice) {
            setDroppedItems(prevItems => ({
                ...prevItems,
                [index]: voiceName
            }));

            try {
                const success = await insertUserLineup({
                    eventId: 1,
                    userId: voice.id,
                    lineupId: 1
                });

                if (success) {
                    console.log('Position inserted successfully');
                } else {
                    console.error('Error inserting position');
                }
            } catch (error) {
                console.error('Error inserting position:', error);
            }
        }
    };

    const handleDragStart = (e, voiceName) => {
        e.dataTransfer.setData('text/plain', voiceName);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleChangeStyle = (e) => {
        e.target.classList.toggle('clicked');
    };

    return (
        <main className='flex mx-auto items-center gap-24 h-[600px] w-[1600px]'>
            <div className='flex flex-col gap-5 border py-20 px-4'>
                <h1 className='text-xl font-semibold'>Available events</h1>
                {events.map((e) => (
                    <button
                        key={e.id}
                        onClick={handleChangeStyle}
                        id='btn-event'
                        className='py-4 px-12 text-red-800 border-2 border-red-800 rounded-lg'>
                        {e.event_title}
                    </button>
                ))}
            </div>

            <section className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-bold py-10'>ESCENARIO</h1>
                <div className='flex flex-wrap justify-center items-end gap-5 bg-gray-700 py-5 px-10 rounded-xl w-[800px]'>
                    {voices.map((voice, index) => (
                        <Droppable
                            key={index}
                            id={`droppable-${index}`}
                            handleDrop={(e) => handleDrop(e, index)}
                            handleDragOver={handleDragOver}
                        >
                            {droppedItems[index] && (
                                <div className='draggable-item' style={{ backgroundColor: voices.find(v => v.firstName === droppedItems[index])?.color }}>
                                    {droppedItems[index]}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>

                <div className='flex justify-center items-end gap-5 mt-10'>
                    {voices.map((v) => (
                        <Draggable
                            key={v.id}
                            voiceName={v.firstName}
                            voiceColor={v.color}
                            handleDragStart={(e) => handleDragStart(e, v.firstName)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
