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
        <article>
            <form action={dispatch}>
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            {state && <p className="text-red-500">* {state}</p>}

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
                <Button
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </article>
    );
}
