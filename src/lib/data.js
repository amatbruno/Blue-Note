"use server"

import prisma from "./prisma";
import bcrypt from 'bcrypt';
import SendEmail from "./resend";
import { redirect } from "next/navigation";

export async function generateCodeByType(prevState, data) {
    try {
        const codeType = data.get("type");
        const randomCode = Math.floor(Math.random() * 100000);
        const resultCode = randomCode.toString();
        const usesLeft = data.get("uses");
        const singerRol = data.get("rol");

        if (singerRol === "undefined" || codeType === "undefined") {
            return `¡Elige un rol válido!`;
        }
        
        const hashedResultCode = await bcrypt.hash(resultCode, 10);

        await prisma.codigoActivacion.create({
            data: {
                activationCode: hashedResultCode,
                type: codeType.toUpperCase(),
                singer_rol: singerRol,
                usesLeft: parseInt(usesLeft, 10),
            }
        });

        await SendEmail('Nuevo código generado', `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${ resultCode }</h2>
            <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Your Brand Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
            </div>
            </div>
        </div>
        `)

        return `Código generado: ${resultCode}`;
    } catch (error) {
        return `¡Vaya! Algo salió mal, ${error}`;
    }
}

export async function codeAuthorization(prevState, data) {
    try {
        const code = data.get("code").trim();
        if (code) {
            const allStoredCodes = await prisma.codigoActivacion.findMany();

            for (const storedCode of allStoredCodes) {
                const match = await bcrypt.compare(code, storedCode.activationCode);
        
                if (match) {
                    const userType = storedCode.type;
                    const singerRol = storedCode.singer_rol
                    const usesCodeLeft = storedCode.usesLeft-1;
 
                    if(usesCodeLeft === 0) {
                        await prisma.codigoActivacion.delete({
                            where: {
                                id: storedCode.id
                            }
                        });                        
                    }else{
                        await prisma.codigoActivacion.update({
                            where: {
                                id: storedCode.id
                            },
                            data: {
                                usesLeft: usesCodeLeft
                            }
                        });
                    }

                    return `${userType}`
                }
            }

            return `Código no válido: ${code}`;
        }
        return 'Añade un código';
    } catch (error) {
        return `¡Vaya! Algo salió mal: ${error}`;
    }
}


export async function registerForm(prevState, data) {
    let route;

    try {
        const name = data.get("name");
        const secondName = data.get("secondName");
        const email = data.get("email");
        const password = data.get("password");
        const repeatPassword = data.get("repeatPassword");
        const type = data.get("userType");
        const gender = data.get("gender");
        const height = data.get("height");
        const birthDate = data.get("birthDate");
        const birthDateWithTime = `${birthDate}T00:00:00Z`;

        if (!name || !secondName || !email || !password || !repeatPassword || !type || !gender || !height || !birthDate) {
            return 'Por favor rellene todos los campos'
        }

        if (height > 2.5) {
            return 'Por favor sea realista con la estatura'
        }

        if (height.toString().includes('.')) {
            return 'Por favor represente la estatura con una ","'
        }

        if (password != repeatPassword) {
            return "Las contraseñas no coinciden"
        }

        const emailMatch = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (emailMatch) {
            return `Email: ${email} ya esta registrado`
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstName: name,
                lastName: secondName,
                email: email,
                password: hashedPassword,
                type: type,
                gender: gender,
                height: height,
                birthDate: birthDateWithTime,
                color: 'amarillo',
            }
        });

        route = user.type.toLowerCase();
    } catch (error) {
        return `Error al registrar usuario: ${error.message}`;
    }

    redirect('/' + route);
}


export async function loginForm(prevState, data) {
    let route;

    try {
        const email = data.get("email");
        const password = data.get("password");
       
        if (!email || !password) {
            return 'Por favor rellene todos los campos';
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            return 'Usuario no encontrado';
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return 'Contraseña incorrecta';
        }

        route = user.type.toLowerCase(); 
    } catch (error) {
        return `Error al iniciar sesion`
    }

    redirect('/' + route)
}

//optimizacion del codigo