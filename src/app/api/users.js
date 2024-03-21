"use server";

import { PrismaClient } from '@prisma/client';

//Function to generate a random ID
function generateID(length) {
    const charset = '1234567890';
    let id = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        id += charset[randomIndex];
    }

    return parseInt(id);
}

const prisma = new PrismaClient();

export async function main() {
    // await prisma.usuario.create({
    //     data: {
    //         nombre: "Alice",
    //         email: "alice@prisma.io",
    //         apellidos: "Doe",
    //         identificacion: "1234567890",
    //         rol: "user",
    //         cuerda: "Example cuerda",
    //         color: "Example color",
    //         sexo: "female",
    //         estatura: 170,
    //         fecha_nacimiento: new Date().toISOString(),
    //         foto: null,
    //         codigoActivacion: {
    //             create: {
    //                 cod_activacion: "abc123"
    //             }
    //         }
    //     },
    // })

    const allUsers = await prisma.usuario.findMany()
    console.log(allUsers)
}

main()
    .catch(e => {
        throw e
    })
    // 5
    .finally(async () => {
        await prisma.$disconnect()
    })