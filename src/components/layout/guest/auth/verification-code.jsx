'use client'

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useFormState } from "react-dom";
import { codeAuthorization } from "@/lib/data";
import { useState } from "react";
import { useEffect } from "react";
import Register from "./register";

export default function VerificationCode({
    verificationCode
}) {
    const [state, dispatch] = useFormState(codeAuthorization, undefined);
    const [showAdditionalInputs, setShowAdditionalInputs] = useState(true);

    useEffect(() => {
        if (state) {
            if (state === "ADMIN" || state === "DIRECTOR" || state === "SINGER" || state === "TEMP") {
                setShowAdditionalInputs(false);
            }
        }
    }, [state]);

    return (
        <div className="flex items-center justify-center h-screen">
            <article className="z-10">
                <div className="flex justify-center">
                    {showAdditionalInputs ? (
                        <form action={dispatch}>
                            <h1 className="block text-2xl mb-1 font-bold">Introduce el codigo para registrarte</h1>
                           
                                <div className="mb-4 ml-10">
                                {state && <p className="text-red-500 ml-14">* {state}</p>}
                                    <Input
                                        placeholder="Código de verificación"
                                        value={verificationCode}
                                        name="code"
                                    />

                                    <Button type="submit" hidden>
                                        Activar Código
                                    </Button>
                                </div>
                        </form>
                    ) : (
                        <div>
                            {state && <h1 className="animate__animated animate__backOutUp">Bienvenido {state}</h1>}
                            <Register userType={state} />
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
}
