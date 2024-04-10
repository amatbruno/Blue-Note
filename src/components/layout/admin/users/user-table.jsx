"use client"

import React, { useEffect, useState, Suspense } from 'react';
import { getAllUsers } from '@/lib/data';
import UserEditTable from './user-edit';
import { deleteUser } from '@/lib/data';
import Spinner from '@/components/ui/spinner';

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [edit, isEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const hola = async (userid) => {
        const selected = users.find(user => user.id === userid);
        setSelectedUser(selected);
        isEdit(true)
    }

    const adios = async (userid) => {
        deleteUser(userid);
        await deleteUser()
        fetchData()
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const usersData = await getAllUsers();
            setUsers(usersData);
            isEdit(false);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditSuccess = () => {
        fetchData(); // Recargar los datos cuando se complete la edición
    };

    return (
        <article className="border p-5 rounded flex flex-col gap-5 rounded">
            {loading ? (
                <Spinner />
            ) : (
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
                    <Suspense fallback={<Spinner />}>
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
                    </Suspense>
                </table>
            )}
            {
                edit &&
                <Suspense fallback={<Spinner />}>
                    <UserEditTable selectedUser={selectedUser} onEditSuccess={handleEditSuccess}/>
                </Suspense>
            }
        </article >
    );
}
