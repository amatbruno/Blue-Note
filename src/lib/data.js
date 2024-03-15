"use server"

import prisma from "./prisma";
import bcrypt from 'bcrypt';
import SendEmail from "./resend";

export async function generateCodeByType(prevState, data) {
    try {
        const codeType = data.get("type");
        console.log(codeType)
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
                cod_activacion: hashedResultCode,
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
                const match = await bcrypt.compare(code, storedCode.cod_activacion);
        
                if (match) {
                    const userType = storedCode.type;
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

                    switch(userType) {
                        case 'ADMIN':
                            return 'es admin'
                        case 'DIRECTOR':
                            return 'es director'
                        case 'SINGER':
                            return 'es singer'
                        case 'TEMP':
                            return 'es temp'
                        default:
                            return 'no se a encontrado el typo de usuario'
                    }
                }
            }

            return `Código no válido: ${code}`;
        }
        return 'Añade un código';
    } catch (error) {
        return `¡Vaya! Algo salió mal: ${error}`;
    }
}

//optimizacion del codigo