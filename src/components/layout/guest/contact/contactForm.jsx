"use client"

import React from 'react';
import { useFormState } from "react-dom";
import Button from '@/components/ui/button';
import { Contact } from '@/lib/data';

export default function FormContact({
    title,
    description,
    proposal,
    contactEmail,
    contactPhone
}) {
    const [state, dispatch] = useFormState(Contact, undefined);

    return (
        <article className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4 mt-32">Contactanos</h1>
            {state && <p className='text-red-500'>* {state}</p>}
            <form action={dispatch} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="proposal" className="mb-1">Propósito:</label>
                    <select
                        id="proposal"
                        value={proposal}
                        name='proposal'
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    >
                        <option value="colaborar">Tienes alguna causa solidaria</option>
                        <option value="cantar">Solicutod de union al coro</option>
                        <option value="contratar">Contratacion para eventos</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>
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
                    <label htmlFor="contactEmail" className="mb-1">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="contactEmail"
                        value={contactEmail}
                        name='contactEmail'
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="contactPhone" className="mb-1">Teléfono de Contacto:</label>
                    <input
                        type="tel"
                        id="contactPhone"
                        value={contactPhone}
                        name='contactPhone'
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Crear Evento</Button>
            </form>
        </article>
    )
}    