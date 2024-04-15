"use client"

import React, { useEffect, useState, Suspense } from 'react';
import { getAllUsers } from '@/lib/data';
import UserEditTable from './user-edit';
import { deleteUser } from '@/lib/data';
import Spinner from '@/components/ui/spinner';
import userCard from '@/components/layout/admin/users/userCard';

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
        fetchData();
    };

    return (
        <div className="flex justify-start gap-5">
            <article className="border p-5 rounded flex flex-col gap-5">
                {loading ? (
                    <Spinner />
                ) : (
                    <Suspense fallback={<Spinner />}>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <userCard name={user.firstName} type={user.type} />
                                        {/* <td className="p-2 border">{user.firstName}</td>
                                        <td className="p-2 border">{user.lastName}</td>
                                        <td className="p-2 border">{user.email}</td>
                                        <td className="p-2 border">{user.type}</td>
                                        <td className="p-2 border">{user.gender}</td> */}

                                        <div className='p-2'>
                                            <span className="cursor-pointer" onClick={() => hola(user.id)}>✏️</span>
                                            <span className="mr-2 cursor-pointer" onClick={() => adios(user.id)}>🗑️</span>
                                        </div>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Suspense>
                )}
                {
                    edit &&
                    <Suspense fallback={<Spinner />}>
                        <UserEditTable selectedUser={selectedUser} onEditSuccess={handleEditSuccess} />
                    </Suspense>
                }
            </article >
        </div >

    );
}
