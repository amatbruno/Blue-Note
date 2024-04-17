"use client"

import React, { useEffect, useState, Suspense } from 'react';
import { getAllUsers } from '@/lib/data';
import UserEditTable from './user-edit';
import { deleteUser } from '@/lib/data';
import Spinner from '@/components/ui/spinner';
import AWN from 'awesome-notifications';

const notifier = new AWN();

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [edit, isEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false)

    const handleEdit = async (userid) => {
        const selected = users.find(user => user.id === userid);
        setSelectedUser(selected);
        isEdit(true)
    }

    const handleDelete = async (userid) => {
        deleteUser(userid);
        await deleteUser()
        fetchData()
        setShowNotification(true);
    }

    if (showNotification) {
        notifier.success('Usuario borrado');
        setShowNotification(false);
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
        <article className="border p-5 flex gap-5 rounded">
            {loading ? (
                <Spinner />
            ) : (
                <table className="table-fixed">
                    <Suspense fallback={<Spinner />}>
                        <tbody className='flex gap-10'>
                            {users.map((user) => (
                                <tr className='border h-fit w-[150px]' key={user.id}>
                                    <td className='w-[500px]'>
                                        <img src={user.photo === null ? `data:image/jpeg;base64,${user.photo}` : "/images/Hombre.png"} alt={user.firstName} />
                                    </td>
                                    <div className='flex flex-col justify-center items-center border h-fit py-5'>
                                        <td className="">{user.firstName + ' ' + user.lastName}</td>
                                        <td className="">{user.type}</td>
                                        <div id='opt-container' className='fixed p-2 justify-start items-start top-8'>
                                            <span id='pencil' className="cursor-pointer" onClick={() => handleEdit(user.id)}>✏️</span>
                                            <span id='trash' className="mr-2 cursor-pointer" onClick={() => handleDelete(user.id)}>🗑️</span>
                                        </div>
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
                    <UserEditTable selectedUser={selectedUser} onEditSuccess={handleEditSuccess} />
                </Suspense>
            }
        </article >
    );
}
