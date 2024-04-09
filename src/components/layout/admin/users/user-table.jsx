"use client"

import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/data';

export default function UserTable() {
    const [users, setUsers] = useState([]);

    const hola = (userid) => {
        console.log(userid)
    }

    const adios = (userid) => {
        console.log(userid)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchData();
    }, []);



    return (
        <article className="border p-5 rounded flex flex-col gap-5 rounded">
            <table className="table-fixed">
                <thead>
                    <tr>
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Nombre</th>
                        <th className="p-2 border">Apellido</th>
                        <th className="p-2 border">Correo</th>
                        <th className="p-2 border">Tipo de Usuario</th>
                        <th className="p-2 border">Género</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="p-2 border">{user.id}</td>
                            <td className="p-2 border">{user.firstName}</td>
                            <td className="p-2 border">{user.lastName}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">{user.type}</td>
                            <td className="p-2 border">{user.gender}</td>
                            <div className='p-2'>

                                <span className="cursor-pointer" onClick={() => hola(user.id)}>✏️</span>
                                <span className="mr-2 cursor-pointer" onClick={() => adios(user.id)}>🗑️</span>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
        </article>
    );
}
