'use client'

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useFormState } from "react-dom";
import { passwordResend } from "@/lib/data";
import { useState } from "react";
import { useEffect } from "react";

export default function UpdatePassword({
    email
}) {
    const [state, dispatch] = useFormState(passwordResend, undefined);
    const [showAdditionalInputs, setShowAdditionalInputs] = useState(true);

    return (
        <div className="flex items-center justify-center h-screen">
            <article className="z-10">
                <div className="flex justify-center">
                    {showAdditionalInputs ? (
                        <form action={dispatch}>
                            <h1 className="block text-2xl mb-1 font-bold">Introduce el correo electronico</h1>
                           
                                <div className="mb-4 ml-10">
                                {state && <p className="text-red-500 ml-14">* {state}</p>}
                                    <Input
                                        placeholder="prueba123@gmail.com"
                                        value={email}
                                        name="email"
                                    />
                                    <Button type="submit" hidden>
                                        Activar Código
                                    </Button>
                                </div>
                        </form>
                    ) : (
                        <div>
                            {state && <h1 className="animate__animated animate__backOutUp">Bienvenido {state}</h1>}
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
}
