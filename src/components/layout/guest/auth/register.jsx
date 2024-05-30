"use client"; // Indica que este componente debe renderizarse en el cliente

import Button from "@/components/ui/button"; // Importa el componente Button desde el directorio indicado
import Input from "@/components/ui/input"; // Importa el componente Input desde el directorio indicado
import { useFormState } from "react-dom"; // Importa el hook useFormState desde react-dom
import { registerForm } from "@/lib/data"; // Importa la configuración del formulario desde @/lib/data

// Definición del componente Register, que recibe varios props
export default function Register({
    firstName,
    secondName,
    email,
    password,
    repeatPassword,
    userType,
    gender,
    height,
    birthDate,
    rope
}) {
    // Usa el hook useFormState para manejar el estado del formulario
    const [state, dispatch] = useFormState(registerForm, undefined);
    // Divide el valor de userType en dos partes: userTypeValue y ropeValue
    const [userTypeValue, ropeValue] = userType.split(',');

    return (
        <article className="mt-20 mx-auto max-w-4xl">
            {/* Formulario con manejo de envío a través de dispatch */}
            <form onSubmit={dispatch} className="space-y-6">
                {/* Si hay un estado (error), se muestra un mensaje en rojo */}
                {state && <p className="text-red-500">* {state}</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2">Nombre</label>
                            <Input
                                placeholder="Nombre"
                                value={firstName}
                                name="name"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="secondName" className="block mb-2">Apellido</label>
                            <Input
                                placeholder="Apellido"
                                value={secondName}
                                name="secondName"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <Input
                                placeholder="Email"
                                value={email}
                                name="email"
                                type="email"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2">Contraseña</label>
                            <Input
                                placeholder="Contraseña"
                                value={password}
                                name="password"
                                type="password"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="repeatPassword" className="block mb-2">Repite Contraseña</label>
                            <Input
                                placeholder="Repite Contraseña"
                                value={repeatPassword}
                                name="repeatPassword"
                                type="password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        {/* Logo centrado */}
                        <img src="/path/to/your/logo.png" alt=" " className="max-h-24" />
                    </div>

                    <div>
                        <div className="mb-4">
                            <label htmlFor="userType" className="block mb-2">Tipo</label>
                            <Input
                                placeholder="Tipo"
                                value={userTypeValue}
                                name="userType"
                                readOnly
                                style={{ cursor: 'not-allowed' }} // Cursor deshabilitado para inputs de solo lectura
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="rope" className="block mb-2">Cuerda</label>
                            <Input
                                placeholder="Cuerda"
                                value={ropeValue}
                                name="rope"
                                readOnly
                                style={{ cursor: 'not-allowed' }} // Cursor deshabilitado para inputs de solo lectura
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="gender" className="block mb-2">Sexo</label>
                            <select
                                id="gender"
                                name="gender"
                                value={gender}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="femenino">Femenino</option>
                                <option value="masculino">Masculino</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="height" className="block mb-2">Estatura (cm)</label>
                            <Input
                                placeholder="Estatura"
                                value={height}
                                name="height"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="birthDate" className="block mb-2">Fecha de Nacimiento</label>
                            <Input
                                placeholder="Fecha de Nacimiento"
                                value={birthDate}
                                type="date"
                                name="birthDate"
                            />
                        </div>
                    </div>
                </div>
                <Button type="submit">
                    Activar Código
                </Button>
            </form>
        </article>
    );
}
