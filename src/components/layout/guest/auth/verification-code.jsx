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
        <article>
            <div className="flex justify-center">
                {showAdditionalInputs ? (
                    <form action={dispatch}>

                        {state && <p className="text-red-500">* {state}</p>}

                        <div className="mb-4">
                            <Input
                                placeholder="Código de verificación"
                                value={verificationCode}
                                name="code"
                            />
                            <Button type="submit">
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
    );
}
