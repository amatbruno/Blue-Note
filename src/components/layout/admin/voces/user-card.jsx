"use client"

import { main } from '@/app/api/users';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function usersCard() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const apiURL = "http://localhost:3000/app/api/users";

        axios.get(apiURL)
            .then((res) => {
                setUsers(res.data);
            });
    }, []);

    if (!users) return null;

    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id_usuario}>
                        {user.nombre}
                    </li>
                ))}
            </ul>
        </div>
    )
}