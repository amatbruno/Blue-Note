"use client"

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useFormState } from "react-dom";
import { registerForm } from "@/lib/data";

export default function Register({
    firstName,
    secondName,
    email,
    password,
    repeatPassword,
    userType,
    gender,
    height,
    birthDate   
}) {
    const [state, dispatch] = useFormState(registerForm, undefined);

    return (
        <article className="mt-20">
            <form action={dispatch}>
                {state && <p className="text-red-500">* {state}</p>}
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="name">Nombre</label>
                        <Input
                            placeholder="Nombre"
                            value={firstName}
                            name="name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="secondName">Apellido</label>
                        <Input
                            placeholder="Apellido"
                            value={secondName}
                            name="secondName"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <Input
                            placeholder="Email"
                            value={email}
                            name="email"
                            type="email"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email">Contraseña</label>
                        <Input
                            placeholder="password"
                            value={password}
                            name="password"
                            type="password"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email">Repite contraseña</label>
                        <Input
                            placeholder="repeatPassword"
                            value={repeatPassword}
                            name="repeatPassword"
                            type="password"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="userType">Tipo</label>
                        <Input
                            placeholder="Tipo"
                            value={userType}
                            name="userType"
                            readOnly
                            style={{ cursor: 'not-allowed' }}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="gender">Sexo</label>
                        <select
                            id="gender"
                            name="gender"
                            value={gender}
                        >
                            <option value="femenino">Femenino</option>
                            <option value="masculino">Masculino</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="height">Estatura (cm)</label>
                        <Input
                            placeholder="Estatura"
                            value={height}
                            name="height"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="birthDate">Fecha de Nacimiento</label>
                        <Input
                            placeholder="Fecha de Nacimiento"
                            value={birthDate}
                            type="date"
                            name="birthDate"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                >
                    Activar Código
                </Button>
            </form>
        </article>
    );
}