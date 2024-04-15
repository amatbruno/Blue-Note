"use client"

import { useEffect, useState } from 'react';
import { getUserSession } from '@/lib/data';
import { useFormState } from "react-dom";
import Spinner from '@/components/ui/spinner';
import Button from '@/components/ui/button';
import { settingsUser } from '@/lib/data';

export default function UserSettings() {
    const [verificationCompleted, setVerificationCompleted] = useState(false);
    const [isRope, setIsRpoe] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserSession();
            const pathname = window.location.pathname;
            const usernameFromUrl = pathname.split('/')[2]; // Asumiendo que la URL es '/settings/username'

            if (user.firstName !== usernameFromUrl) {
                // Si los nombres de usuario no coinciden, redirigir al usuario o mostrar un mensaje de error
                window.location.replace(`/${user.type.toLowerCase()}`);
            } else {
                // Si coinciden, marcar el proceso de verificación como completado
                setVerificationCompleted(true);
                setUser(user);
            }

            if (!user.rope) {
                setIsRpoe(true)
            }
        };

        fetchUserData();

    }, []);

    const [state, dispatch] = useFormState(settingsUser, undefined);

    return (
        <div className="flex items-center ml-80 mt-56">
            {verificationCompleted ? (
                <>
                    {user.gender === 'masculino' ? (
                        <table className="table-fixed border-8 border-blue-300 shadow-lg rounded-xl">
                            <tbody>
                                <img src="/images/Hombre.png" className="h-2/6 z-3" />
                                <tr className='row'>
                                    <td className="text-left px-4 py-2 text-center">Sr. {user.firstName} {user.lastName}</td>
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
                    ) : (
                        <table className="table-fixed border-8 border-green-300 shadow-lg rounded-xl">
                            <tbody>
                                <img src="/images/Mujer.png" className="h-2/6 z-3" />
                                <tr className='row'>
                                    <td className="text-left px-4 py-2 text-center">Sra. {user.firstName} {user.lastName}</td>
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
                    )}
                    <div className='p-2'>
                        {state &&
                            <p className="text-red-500">* {state}</p>
                        }
                        <form
                            action={dispatch}
                            id="user_table_form"
                        >
                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="email">Correo: {user.email}</label>
                                    <input className="p-2 border" name="email" />
                                </div>
                                {user.type === 'SINGER' && isRope && (
                                    <div className="flex flex-col mt-2 mb-2">
                                        <label>
                                            ¿Que tipo de cantate es?:
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
                                    <label htmlFor="repeatpassword">Repetir contraseña</label>
                                    <input className="p-2 border" name="repeatpassword" type='password' />
                                </div>
                                <input className="p-2 border" name="id" value={user.id} hidden/>
                                <div className='mt-2'>
                                    <Button type="submit">Submit</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );

}