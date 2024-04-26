"use client"

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useFormState } from "react-dom";
import { loginForm } from "@/lib/data";

export default function Register({
    email,
    password,
}) {
    const [state, dispatch] = useFormState(loginForm, undefined);

    return (
        <div className="flex items-center justify-center h-screen">
            <article className="z-10 bg-white bg-opacity-75 rounded-lg p-6">
                <form action={dispatch}>
                    {state && <p className="text-red-600 text-xl text-center mb-4">* {state}</p>}

                    <div className="mb-4 ml-10">
                        <label htmlFor="email" className="block text-3xl mb-4">Correo electronico</label>
                        <Input
                            placeholder="Email"
                            value={email}
                            name="email"
                            type="email"
                            className="text-red-500"
                        />
                    </div>

                    <div className="mb-3 ml-10">
                        <label htmlFor="password" className="block text-3xl mb-4 ml-7">Contraseña</label>
                        <Input
                            placeholder="Password"
                            value={password}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className="mb-4">
                        <a className="auth-a-password text-xl hover:text-blue-400 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">
                            haz clic aqui
                        </a>
                        <span> para restablecer la contraseña</span>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="font-bold py-2 px-4 rounded"
                        >
                            <p className="text-2xl font-bold">Iniciar sesión</p>
                        </button>
                    </div>
                </form>
            </article>
        </div>
    );
}