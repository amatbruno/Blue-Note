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

    var rawData, base64Image;

    return (
        <article className="border p-5 flex flex-col gap-5 rounded">
            {loading ? (
                <Spinner />
            ) : (
                <table className="table-fixed">
                    <Suspense fallback={<Spinner />}>
                        <tbody>
                            {users.map((user) => (
                                <tr className='border' key={user.id}>
                                    {rawData = user.photo.data}
                                    {base64Image = Buffer.from(rawData).toString('base64')}
                                    <td className=''><img src={`data:image/jpeg;base64,${user.photo}`} alt={user.firstName} /></td>
                                    <td className="">{user.firstName}</td>
                                    <td className="">{user.lastName}</td>
                                    <td className="">{user.email}</td>
                                    <td className="">{user.type}</td>
                                    <td className="">{user.gender}</td>
                                    <div className='p-2'>
                                        <span className="cursor-pointer" onClick={() => handleEdit(user.id)}>✏️</span>
                                        <span className="mr-2 cursor-pointer" onClick={() => handleDelete(user.id)}>🗑️</span>
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
