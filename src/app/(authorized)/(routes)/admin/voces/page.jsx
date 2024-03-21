import React from 'react'
import UsersCard from '@/components/layout/admin/voces/user-card';

export default function page() {
    return (
        <>
            <main className='flex gap-2'>
                <aside className='h-fit w-64 border border-black'>
                    <h1 className='text-center'>FILTROS</h1>
                </aside>
                <section className='border h-fit w-full border-black'>
                    <h1 className='text-center py-4 text-3xl'>AQUÍ SE VERÁS LAS VOCES</h1>
                    <div>
                        <UsersCard />
                    </div>
                </section>
            </main>
        </>
    )
}