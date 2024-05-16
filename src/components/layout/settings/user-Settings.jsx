"use client"

import { useEffect, useState } from 'react';
import { getUserSession, settingsUser } from '@/lib/data';
import { useFormState } from "react-dom";
import Spinner from '@/components/ui/spinner';
import Button from '@/components/ui/button';
import AWN from 'awesome-notifications';

const notifier = new AWN();

export default function UserSettings() {
    const [verificationCompleted, setVerificationCompleted] = useState(false);
    const [isRope, setIsRope] = useState(false);
    const [user, setUser] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showErrorRopeNotification, setShowErrorRopeNotification] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const fetchUserData = async () => {
        const user = await getUserSession();
        const pathname = window.location.pathname;
        const usernameFromUrl = pathname.split('/')[2];

        if (user.firstName !== usernameFromUrl) {
            window.location.replace(`/${user.type.toLowerCase()}`);
        } else {
            setVerificationCompleted(true);
            setUser(user);
        }

        if (!user.rope) {
            setIsRope(true);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const [state, dispatch] = useFormState(settingsUser, undefined);

    useEffect(() => {
        if (state === 'Usuario modificado') {
            setShowNotification(true);
            setShowErrorRopeNotification(false);
        } else if (state === 'Las contraseñas no coinciden' || state === 'Los gmail conciden' || state === 'Error eliga una cuerda') {
            setShowNotification(false);
            setShowErrorRopeNotification(true);
        }
    }, [state]);

    useEffect(() => {
        if (showNotification) {
            notifier.success(state);
            setShowNotification(false);
            fetchUserData();
        }
    }, [showNotification]);

    useEffect(() => {
        if (showErrorRopeNotification) {
            notifier.alert(state);
            setShowErrorRopeNotification(false);
        }
    }, [showErrorRopeNotification]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file.name)
            setImageName(file.name)
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

   

    return (
        <div className="flex items-center ml-80 mt-56">
            <p>{imageName}</p>
            {verificationCompleted ? (
                <>
                    <table className={`table-fixed border-8 shadow-lg rounded-xl ${user.gender === 'masculino' ? 'border-blue-300' : 'border-green-300'}`}>
                        <tbody>
                            <tr className='row'>
                                <td className="text-left px-4 py-2 text-center">
                                    <img
                                        src={selectedImage || user.photo}
                                        alt="Profile Image"
                                        className="h-56 z-3 cursor-pointer"
                                        onClick={() => document.getElementById('fileInput').click()}
                                    />
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </td>
                            </tr>
                            <tr className='row'>
                                <td className="text-left px-4 py-2 text-center">{user.gender === 'masculino' ? 'Sr.' : 'Sra.'} {user.firstName} {user.lastName}</td>
                            </tr>
                            <tr className='row'>
                                <td className="text-left px-4 py-2 text-center">{user.type}</td>
                            </tr>
                            {user.type === 'SINGER' && (
                                <tr className='row'>
                                    <td className="text-left px-4 py-2 text-center">{user.rope}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='p-2'>
                        <form
                            action={dispatch}
                            id="user_table_form"
                        >
                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="email">Correo: </label>
                                    <input className="p-2 border" name="email" placeholder={user.email} type='email' />
                                </div>
                                {user.type === 'SINGER' && isRope && (
                                    <div className="flex flex-col mt-2 mb-2">
                                        <label>
                                            ¿Qué tipo de cantante es?:
                                            <select name="rope">
                                                <option value="undefined">Undefined</option>
                                                <option value="SOPRANO">Soprano</option>
                                                <option value="ALTO">Alto</option>
                                                <option value="TENOR">Tenor</option>
                                                <option value="BAJO">Bajo</option>
                                            </select>
                                        </label>
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <label htmlFor="password">Cambiar contraseña</label>
                                    <input className="p-2 border" name="password" type='password' />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="repeatPassword">Repetir contraseña</label>
                                    <input className="p-2 border" name="repeatPassword" type='password' />
                                </div>
                                <input className="p-2 border" name="id" value={user.id} hidden />
                                <div className='mt-2'>
                                    <Button type="submit">Submit</Button>
                                </div>
                            </div>
                            <input type="hidden" value={imageName} name="imageName"/>
                        </form>
                    </div>
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
}
