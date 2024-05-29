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
            <article id="login" className="z-10 bg-black border border-white bg-opacity-65 rounded-lg p-6">
                <form action={dispatch}>
                    {state && <p className="text-red-600 text-xl text-center mb-4">* {state}</p>}

                    <div className="mb-4 ml-10">
                        <label htmlFor="email" className="phone-center-login block text-white mr-16 text-3xl mb-4">Correo electronico</label>
                        <Input
                            placeholder="Email"
                            value={email}
                            name="email"
                            type="email"
                            className="text-red-500"
                        />
                    </div>

                    <div className="mb-3 ml-10">
                        <label htmlFor="password" className="block text-white text-3xl mb-4 ml-7">Contraseña</label>
                        <Input
                            placeholder="Password"
                            value={password}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className="flex mb-4">
                        <Link href="updatePassword">
                            <p className="text-xl mt-4 ml-8 text-customYellow mr-1 hover:text-customOrange cursor-pointer hover:underline transition-colors duration-300 ease-in-out">
                                ¿Has olvidado la contraseña?
                            </p>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="font-bold py-2 px-4 rounded"
                        >
                            <p className="text-white text-2xl mr-8 font-bold">Iniciar sesión</p>
                        </button>
                    </div>
                </form>
            </article>
        </div>
    );
}