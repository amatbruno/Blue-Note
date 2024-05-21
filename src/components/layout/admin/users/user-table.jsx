"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { getAllUsers } from '@/lib/data';
import UserEditTable from '@/components/layout/admin/users/user-edit';
import { deleteUser } from '@/lib/data';
import Spinner from '@/components/ui/spinner';
import AWN from 'awesome-notifications';

const notifier = new AWN();

export default function UserTable() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [edit, isEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const fetchData = async () => {
        try {
            const usersData = await getAllUsers();
            setUsers(usersData);
            setFilteredData(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);

        const filteredUsers = users.filter((user) =>
            user.firstName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filteredUsers);
    };

    const handleEdit = async (userid) => {
        const selected = users.find((user) => user.id === userid);
        setSelectedUser(selected);
        isEdit(true);
    };

    const handleDelete = async (userid) => {
        await deleteUser(userid);
        fetchData();
        setShowNotification(true);
    };

    useEffect(() => {
        if (showNotification) {
            notifier.success('Usuario borrado');
            setShowNotification(false);
        }
    }, [showNotification]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditSuccess = () => {
        fetchData();
    };

    return (
        <main className='flex'>
            <section className="flex gap-5 mt-20">
            </section>
            <article className="border p-5 flex gap-5 rounded">
                {loading ? (
                    <Spinner />
                ) : (
                    <table className="table-fixed">
                        <Suspense fallback={<Spinner />}>
                            <tbody className='flex gap-10'>
                                {filteredData.map((user) => (
                                    <tr className='border h-fit w-[150px]' key={user.id}>
                                        <td className='w-[500px]'>
                                            <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
                                        </td>
                                        <td className='flex flex-col justify-center items-center border h-full py-5'>
                                            <span>{user.firstName + ' ' + user.lastName}</span>
                                            <span>{user.type}</span>
                                            <div id='opt-container' className='mt-2'>
                                                <span id='pencil' className="cursor-pointer" onClick={() => handleEdit(user.id)}>✏️</span>
                                                <span id='trash' className="mr-2 cursor-pointer" onClick={() => handleDelete(user.id)}>🗑️</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Suspense>
                    </table>
                )}
                {edit && <UserEditTable selectedUser={selectedUser} onEditSuccess={handleEditSuccess} />}
            </article >
        </main>
    );
}
