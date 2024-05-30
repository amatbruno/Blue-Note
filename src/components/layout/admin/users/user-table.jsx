"use client";

import UserEditTable from '@/components/layout/admin/users/user-edit';
import Spinner from '@/components/ui/spinner';
import { deleteUser, getAllUsers } from '@/lib/data';
import AWN from 'awesome-notifications';
import { Suspense, useEffect, useState } from 'react';

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
        <main className='flex flex-col items-center justify-center min-h-screen pt-5'>
            <section className="flex gap-5 mt-5">
                <div className='w-full flex justify-center'>
                    <div className="flex items-center gap-2">
                        <img width="30" src="/images/icons/search.png" alt="" />
                        <input placeholder="Nombre de voz" onChange={handleSearch} value={search} className="border border-gray-600 rounded-md w-[250px] px-1 py-0.5" type="text" />
                    </div>
                </div>
            </section>
            <article className="border p-5 flex flex-col items-center gap-5 rounded mt-5">
                {loading ? (
                    <Spinner />
                ) : (
                    <table className="table-fixed">
                        <Suspense fallback={<Spinner />}>
                            <tbody className='flex gap-10'>
                                {filteredData.map((user) => (
                                    <tr className='border h-fit w-[150px]' key={user.id}>
                                        <td className='w-[500px]'>
                                            <img src={user.photo} />
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
