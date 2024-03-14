"use client"

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useFormState } from "react-dom";
import { codeAuthorization } from "@/lib/data";

export default function VerificationCode({
    verificationCode
    
}) {
    const [state, dispatch] = useFormState(codeAuthorization, undefined)
    return (
        <article>
            <form action={dispatch}>
                
                {
                    state && <p className="text-red-500">
                        * {state}
                    </p>
                }

                <Input
                    placeholder="Código de verificación"
                    value={verificationCode}
                    name="code"
                />

                <Button
                    type="submit"
                >
                    Activar Código
                </Button>
            </form>
        </article>
    );
}