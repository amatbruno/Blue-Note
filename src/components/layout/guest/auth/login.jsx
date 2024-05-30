"use client"

import Input from "@/components/ui/input";
import { loginForm } from "@/lib/data";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Register({
    email,
    password,
}) {
    const [state, dispatch] = useFormState(loginForm, undefined);

    return (
        <div className="flex items-center justify-center h-screen" id="closelogin">
            <article id="login" className="z-10 bg-black border border-white bg-opacity-65 rounded-lg py-20 px-10 w-[500px]">
                <h1 className="text-white mb-9 text-center text-3xl font-semibold">Acceso Miembros</h1>
                <form action={dispatch}>
                    {state && <p className="text-red-600 text-xl flex flex-col justify-start mb-4">* {state}</p>}

                    <div className="mb-7">
                        <label htmlFor="email" className="block text-white mr-16 text-xl mb-2">Correo electrónico:</label>
                        <Input
                            placeholder="Tu correo aquí"
                            value={email}
                            name="email"
                            type="email"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white text-xl mb-2">Contraseña:</label>
                        <Input
                            placeholder="Tu contraseña aquí"
                            value={password}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className="flex mb-8">
                        <Link href="updatePassword">
                            <p className="text-md underline mt-4 text-customYellow mr-1 hover:text-customOrange cursor-pointer transition-colors duration-200 ease-in-out">
                                ¿Has olvidado la contraseña?
                            </p>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="font-medium py-2 px-4 w-full rounded-lg text-white text-md bg-[#b84000] hover:bg-[#b84000c5] transition-all duration-200 ease-in-out"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </article>
        </div>
    );
}