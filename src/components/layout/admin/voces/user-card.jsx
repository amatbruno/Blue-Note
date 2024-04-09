import React from 'react';
import prisma from '@/lib/prisma';
import Voice from '@/components/usuarios/Voice';

async function getVoices() {
    const voices = await prisma.usuario.findMany()

    return voices;
}

export default async function usersCard() {
    const voice = await getVoices();
    console.log(voice)
    return (
        <div>
            <ul>
                {
                    voice.map((el) => {
                        return <Voice 
                            key={el.id_usuario}
                            id={el.id_usuario}
                            nombre={el.nombre}
                            apellidos={el.apellidos}
                            cuerda={el.cuerda}
                            email={el.email}
                        />
                    })
                }
            </ul>
        </div>
    )
}