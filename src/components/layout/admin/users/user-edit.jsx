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
    const [showNotification, setShowNotification] = useState(false);
    const [photo, setPhoto] = useState(null);

    // const handlePhotoChange = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         setPhoto(reader.result);
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('id', selectedUser.id);
        formData.append('firstName', event.target.firstName.value);
        formData.append('secondName', event.target.secondName.value);
        formData.append('email', event.target.email.value);
        formData.append('gender', event.target.gender.value);
        if (photo) {
            formData.append('photo', photo);
        }

        dispatch(formData);
    };

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
                onSubmit={handleSubmit}
                id="user_table_form"
                encType="multipart/form-data"
                className='m-auto'
            >
                <div className="flex flex-col">
                    {/* <div className='flex flex-col'>
                        <img src="#" alt='user_photo' />
                        <input type="file" name="photo" onChange={handlePhotoChange} />
                    </div> */}

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
                        <input className="p-2 border" name="userType" value={selectedUser.type} />
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