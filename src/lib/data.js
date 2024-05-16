"use server"

import prisma from "./prisma";
import bcrypt from 'bcrypt';
import SendEmail from "./resend";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decodeToken, generateAccessToken, generateUpdatePasswordToken } from "./jwt";

export async function generateCodeByType(prevState, data, res) {
    try {
        const codeType = data.get("type");
        const randomCode = Math.floor(Math.random() * 100000);
        const resultCode = randomCode.toString();
        const usesLeft = data.get("uses");
        const rope = data.get("singerRol");

        if (codeType === "undefined") {
            return `¡Elige un rol válido!`;
        }

        const hashedResultCode = await bcrypt.hash(resultCode, 10);

        await prisma.codigoActivacion.create({
            data: {
                activationCode: hashedResultCode,
                type: codeType.toUpperCase(),
                usesLeft: parseInt(usesLeft, 10),
                rope: codeType === "SINGER" ? rope : "null"
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
            <span>Utilice este codigo para completar su registro en <a style={{ color: "#EF4444", marginLeft: "0.25rem", textDecoration: "none" }}
            href="http://localhost:3000/verificationCode" >el siguiente enlace</a></span>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${resultCode}</h2>
            <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Your Brand Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
            </div>
            </div>verification-code
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
                    const usesCodeLeft = storedCode.usesLeft - 1;
                    const rope = storedCode.rope;

                    if (usesCodeLeft === 0) {
                        await prisma.codigoActivacion.delete({
                            where: {
                                id: storedCode.id
                            }
                        });
                    } else {
                        await prisma.codigoActivacion.update({
                            where: {
                                id: storedCode.id
                            },
                            data: {
                                usesLeft: usesCodeLeft
                            }
                        });
                    }

                    return `${userType}, ${rope}`
                }
            }

            return `Código no válido: ${code}`;
        }
        return 'Añade un código';
    } catch (error) {
        return `¡Vaya! Algo salió mal: ${error}`;
    }
}


export async function registerForm(prevState, data, res) {
    let route;

    try {
        const name = data.get("name");
        const secondName = data.get("secondName");
        const email = data.get("email");
        const password = data.get("password");
        const repeatPassword = data.get("repeatPassword");
        const type = data.get("userType");
        const gender = data.get("gender");
        const heightString = data.get("height");
        const height = parseFloat(heightString);
        const birthDate = data.get("birthDate");
        const birthDateWithTime = `${birthDate}T00:00:00Z`;
        const rope = data.get("rope").toString().trim();

        console.log(rope)
        if (!name || !secondName || !email || !password || !repeatPassword || !type || !gender || !height || !birthDate) {
            return 'Por favor rellene todos los campos'
        }

        if (height > 2.5) {
            return 'Por favor sea realista con la estatura'
        }

        if (height.toString().includes(',')) {
            return 'Por favor represente la estatura con una "."'
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
                photo: `/images/${gender}.png`,
                rope: rope !== null ? rope : undefined
            }
        });

        route = user.type.toLowerCase();

        const cookieStore = cookies();
        const token = await generateAccessToken(user.id);

        cookieStore.set({
            name: "access-token",
            value: token,
            secure: false,
            httpOnly: false
        })

        if (res) {
            const accessToken = generarToken(user); // Genera el token como prefieras
            res.setHeader('Set-Cookie', serialize('tokenCookie', accessToken, {
                maxAge: 1000 * 60 * 40, // Duración de la cookie (40 minutos en este ejemplo)
                httpOnly: true, // La cookie solo es accesible en el servidor
                secure: process.env.NODE_ENV === 'production', // Se establece a true en producción para conexiones HTTPS
                sameSite: 'lax' // Restringe cómo se envía la cookie en las solicitudes de terceros
            }));
        }
    } catch (error) {
        return `Error al registrar usuario: ${error.message}`;
    }

    redirect('/' + route);
}


export async function loginForm(prevState, data, res) {
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

        const cookieStore = cookies();
        const token = await generateAccessToken(user.id);

        cookieStore.set({
            name: "access-token",
            value: token,
            secure: false,
            httpOnly: false
        })
    } catch (error) {
        return `Error al iniciar sesion ${error}`
    }

    redirect('/' + route)
}

export async function getUserSession() {
    try {
        const userId = await getUserId();

        if (!userId) return false;

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) return false;

        return user;
    } catch (error) {
        return false
    }
}

export async function getUserId() {
    try {
        const cookieStore = cookies();

        if (!cookieStore.has('access-token')) return false

        const { value } = cookieStore.get('access-token');

        const decoded = await decodeToken(value);

        if (!decoded.userId) return false;

        return decoded.userId
    } catch (error) {
        return false
    }
}

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany()
        return users;

    } catch (error) {
        return "Error al cargar usuarios"
    }
}

export async function updateUser(prevState, data, res) {
    try {
        const id = parseInt(data.get("id"));
        const photo = data.get("photo")
        const name = data.get("firstName");
        const secondName = data.get("secondName");
        const email = data.get("email");
        const gender = data.get("gender");

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (gender !== "" && gender !== 'femenino' && gender !== 'masculino') {
            return 'añada femenino o masculino';
        }

        if (email !== "" && !email.includes('@')) {
            return "El correo electrónico debe contener '@'";
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                photo: user.photo,
                firstName: name !== "" ? name : user.firstName,
                lastName: secondName !== "" ? secondName : user.lastName,
                email: email !== "" ? email : user.email,
                type: user.type,
                gender: gender.toLowerCase() !== "" ? gender : user.gender
            }
        });

        return true;
    } catch (error) {
        return false;
    }
}

export async function deleteUser(userId) {
    try {
        await prisma.user.delete({
            where: {
                id: userId
            }
        });

        return 'usuario borrado';
    } catch (error) {
        return `Error al borrar usuario con el id: ${userId}`
    }
}

export async function handleLogout(req, res) {
    cookies().delete('access-token');
}

export async function settingsUser(prevState, data, res) {
    try {
        const id = parseInt(data.get("id"));
        const email = data.get("email");
        const password = data.get("password");
        const repeatPassword = data.get("repeatPassword");
        const photo = data.get("imageName");
        console.log("Photo value:", photo);

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (password != repeatPassword) {
            return "Las contraseñas no coinciden";
        }

        if (email === user.email) {
            return "Los correos electrónicos coinciden";
        }

        let photoPath = null;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: email !== "" ? email : user.email,
                password: password !== "" ? hashedPassword : user.password,
                photo: photoPath !== null ? photoPath : user.photo 
            }
        });

        return 'Usuario modificado';
    } catch (error) {
        console.log(error);
        return `Error: ${error.message}`;
    }
}

export async function getAllEvents() {
    try {
        const event = await prisma.events.findMany()
        return event;

    } catch (error) {
        return "Error al cargar eventos"
    }
}

export async function getEventById(eventId) {
    try {
        const event = await prisma.events.findFirst({
            where: {
                id: eventId
            }
        });
        return event;
    } catch (error) {
        return "Error al cargar evento"
    }
}

export async function passwordResend(prevState, data) {
    try {
        const email = data.get("email");

        const emailMatch = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!email || !emailMatch) {
            return "Tu email no concide";
        }

        const token = await generateUpdatePasswordToken(email);

        await SendEmail('Cambiar la contraseña', `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
            <span>Utilice este código para completar su registro en <a style="color: #EF4444; margin-left: 0.25rem; text-decoration: none" href="http://localhost:3000/updatePassword?token=${token}">el siguiente enlace</a></span>
            <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Your Brand Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
            </div>
            </div>
        </div>
        `);

        return `Email enviado ${email}`;
    } catch (error) {
        return `¡Vaya! Algo salió mal, ${error}`;
    }
}

export async function addEvent(prevState, data) {
    try {
        const title = data.get("title");
        const description = data.get("description");
        const date = data.get("date");
        const time = data.get("time");
        const address = data.get("address");

        if (!title || !description || !date || !time || !address) {
            throw new Error("Por favor, rellene todos los campos obligatorios.");
        }

        const dateString = new Date(date);

        await prisma.events.create({
            data: {
                event_title: title,
                event_description: description,
                date: dateString,
                eventTime: time,
                streetAddres: address,
            }
        })

        return true
    } catch (error) {
        return `* Error al crear evento ${error}`
    }
}

export async function updatePasswordToken(prevState, data, res) {
    try {
        const email = data.get("userEmail")
        const password = data.get("password");
        const repeatPassword = data.get("repeatPassword");

        if (!email || !password || !repeatPassword) {
            return "Por favor, rellene todos los campos.";
        }

        if (password !== repeatPassword) {
            return "Las contraseñas no coinciden.";
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword,
            }
        })

    } catch (error) {
        return "error al cambiar la contraseña"
    }
    redirect('/');
}

export async function Contact(prevState, data) {
    try {
        const proposal = data.get("proposal");
        const title = data.get("title");
        const description = data.get("description");
        const email = data.get("contactEmail");
        const phone = data.get("contactPhone");

        if (!proposal || !title || !description || !email || !phone) {
            return "Por favor, completa todos los campos.";
        }

        await prisma.contactForm.create({
            data: {
                proposal: proposal,
                title: title,
                description: description,
                email: email,
                phone: parseInt(phone)
            }
        })
        //falta madnar email
    } catch (error) {
        return `error ${error}`
    }
}

export async function JoinEvents(prevState, data) {
    try {
        const eventId = parseInt(data.get("eventId"));
        const userId = parseInt(data.get("userId"));
        const date = new Date(data.get("dateEvent"));

        await prisma.assists.create({
            data: {
                eventId: eventId,
                userId: userId,
                dateEvent: date,
            }
        });

        return true;
    } catch (error) {
        console.log(error)
        return `error ${error}`;
    }
}

export async function GetAllJoinEvents() {
    try {
        const assists = await prisma.assists.findMany();
        return assists;
    } catch (error) {
        return "Error al cargar usuarios";
    }
}
//optimizacion del codigo