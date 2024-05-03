"use client"

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useFormState } from "react-dom";
import { passwordResend } from "@/lib/data";
import { useState, useEffect } from "react";
import TokenUpdate from "./tokenUpdate";
import { decodeEmail } from "@/lib/jwt";

export default function UpdatePassword({
    email
}) {
    const [state, dispatch] = useFormState(passwordResend, undefined);
    const [token, setToken] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        
        const getTokenFromQueryString = () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            return urlParams.get('token') || '';
        };

        const tokenFromQueryString = getTokenFromQueryString();

        if (tokenFromQueryString) {
            setToken(tokenFromQueryString);
        }

        const fetchUserEmail = async () => {
            const decodedEmail = await decodeEmail(tokenFromQueryString);
            setUserEmail(decodedEmail);
        };

        fetchUserEmail();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <article className="z-10">
                <div className="flex justify-center">
                    {!token ? (
                        <form action={dispatch}>
                            <h1 className="block text-2xl mb-1 font-bold">Introduce el correo electrónico</h1>

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
                        userEmail && <TokenUpdate userEmail={userEmail} />
                    )}
                </div>
            </article>
        </div>
    );
}