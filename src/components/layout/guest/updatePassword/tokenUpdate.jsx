"use client"

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useFormState } from "react-dom";
import { updatePasswordToken } from "@/lib/data";

export default function TokenUpdate({
    userEmail,
    password,
    repeatPassword,
}) {
    const [state, dispatch] = useFormState(updatePasswordToken, undefined);
    const { userEmail: email } = userEmail;

    return (
        <div>
            <form action={dispatch}>
                <h1 className="block text-2xl ml-4 font-bold">Introduce la nueva contraseña</h1>
                <div className="mb-4 ml-10">
                    {state && <p className="text-red-500 ml-14">* {state}</p>}
                    <p>Correo electrónico: {email}</p>
                    <Input type="hidden" name="userEmail" value={email} />
                    <div className="mb-4">
                        <Input
                            placeholder="Nueva contraseña"
                            value={password}
                            name="password"
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            placeholder="Repetir contraseña"
                            value={repeatPassword}
                            name="repeatPassword"
                        />
                    </div>
                    <Button type="submit" hidden />
                </div>
            </form>
        </div>
    )
}