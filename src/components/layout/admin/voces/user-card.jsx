"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function usersCard() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const apiURL = '/api/users';

        axios.get(apiURL)
            .then((res) => {
                setUsers(res.data);
            });
    }, []);

    if (!users) return null;

    return (
        <div>
            <ul>
                {/*REVISAR LA BASE DE DATOS*/
                    users.map((user, index) => (
                        <li key={index}>{user.nombre}</li>
                    ))}

            </ul>
        </div>
    )
}