"use client"

import React, { useState, useEffect } from 'react';
import { useFormState } from "react-dom";
import Button from '@/components/ui/button';
import { updateUser } from "@/lib/data";
import AWN from 'awesome-notifications';

const notifier = new AWN();

export default function UserEditTable({
    selectedUser,
    onEditSuccess,
}) {
    const [state, dispatch] = useFormState(updateUser, undefined);
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        if (state === true) {
            onEditSuccess();
            setShowNotification(true);
        }
    }, [state, onEditSuccess]);

    useEffect(() => {
        if (showNotification) {
            notifier.success('User edited');
            setShowNotification(false);
        }
    }, [showNotification]);

    return (
        <div>
            {state &&
                <p className="text-red-500">* {state}</p>
            }
            <h1>Datos del Usuario Seleccionado:</h1>
            <form
                action={dispatch}
                id="user_table_form"
            >
                <div className="flex flex-col">
                    <div className="flex flex-col">
                    <label htmlFor="firstName">ID:</label>
                        <input className="p-2 border" name="id" value={selectedUser.id} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="firstName">Nombre: {selectedUser.firstName}</label>
                        <input id="firstName" type="text" className="p-2 border" name="firstName" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastName">Apellido: {selectedUser.lastName}</label>
                        <input className="p-2 border" name="secondName" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Correo: {selectedUser.email}</label>
                        <input className="p-2 border" name="email" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="type">Tipo de Usuario: {selectedUser.type}</label>
                        <input className="p-2 border" name="userType" value={selectedUser.type}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="gender">Género: {selectedUser.gender}</label>
                        <input className="p-2 border" name="gender" />
                    </div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}