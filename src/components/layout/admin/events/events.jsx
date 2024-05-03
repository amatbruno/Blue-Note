"use client"

import React, { useState, useEffect } from 'react';
import { useFormState } from "react-dom";
import { addEvent } from '@/lib/data';
import Button from '@/components/ui/button';
import AWN from 'awesome-notifications';

const notifier = new AWN();

export default function CreateEvents({
    title,
    description,
    date,
    time,
    address
}) {
    const [state, dispatch] = useFormState(addEvent, undefined);
    const [isEventCreated, setIsEventCreated] = useState(false);

    useEffect(() => {
        if (state) {
            setIsEventCreated(true);
        }
    }, [state]);

    useEffect(() => {
        if (isEventCreated) {
            notifier.success('Evento creado');
            setIsEventCreated(false);
        }
    }, [isEventCreated]);

    return (
        <article className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4">Crea tus propios eventos</h1>
            {state && <p className='text-red-500'>{state}</p>}
            <form action={dispatch} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-1">Título:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        name='title'
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-1">Descripción:</label>
                    <textarea
                        id="description"
                        value={description}
                        name='description'
                        className="border border-gray-300 px-3 py-2 rounded-lg resize-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="date" className="mb-1">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        name='date'
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="time" className="mb-1">Hora:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        name='time'
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="address" className="mb-1">Dirección del mapa:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        name='address'
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Crear Evento</Button>
            </form>
        </article>
    )
}