"use client"

import React from 'react'
import { useEffect, useState } from 'react';

export default function usersCard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    throw new Error('Failed to fetch users');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);
    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}