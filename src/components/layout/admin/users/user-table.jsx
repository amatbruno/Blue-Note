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
        deleteUser(userid);
        await deleteUser();
        fetchData();
        setShowNotification(true);
    };

    if (showNotification) {
        notifier.success('Usuario borrado');
        setShowNotification(false);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
                setFilteredData(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleEditSuccess = () => {
        fetchData();
    };

    return (
        <main className='flex'>
            <section className="flex gap-5 mt-20">
                <article className='border border-black px-10 py-10 h-fit w-fit rounded-xl'>
                    <h1 className='text-2xl font-semibold text-center'>Panel de filtros</h1>

                    <div className="flex justify-start items-center mt-8 gap-2">
                        <img width="30" src="/images/icons/search.png" alt="" />
                        <input placeholder="Nombre de voz" onChange={handleSearch} value={search} className="border border-gray-600 rounded-md w-[250px] px-1 py-0.5" type="text" />
                    </div>

                    <div className='flex flex-col justify-center gap-3 mt-8'>
                        <div className="flex justify-start gap-3">
                            <input type="checkbox" name="soprano" id="soprano" className="w-4" />
                            <label className="text-lg" htmlFor="soprano">Soprano</label>
                        </div>
                        <div className="flex justify-start gap-3">
                            <input type="checkbox" name="tenor" id="tenor" className="w-4" />
                            <label className="text-lg" htmlFor="tenor">Tenor</label>
                        </div>
                        <div className="flex justify-start gap-3">
                            <input type="checkbox" name="contralto" id="contralto" className="w-4" />
                            <label className="text-lg" htmlFor="contralto">Contralto</label>
                        </div>
                        <div className="flex justify-start gap-3">
                            <input type="checkbox" name="bajo" id="bajo" className="w-4" />
                            <label className="text-lg" htmlFor="bajo">Bajo</label>
                        </div>
                    </div>
                </article>
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
                                            {/* <img src={user.photo}/> */}
                                        </td>
                                        <div className='flex flex-col justify-center items-center border h-full py-5'>
                                            <td className="">{user.firstName + ' ' + user.lastName}</td>
                                            <td className="">{user.type}</td>
                                            <div id='opt-container' className='mt-2'>
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
        </main>
    );
}