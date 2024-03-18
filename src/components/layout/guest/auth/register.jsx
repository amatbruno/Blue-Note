"use client"

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useFormState } from "react-dom";
import { codeAuthorization } from "@/lib/data";

export default function Register({
    firstName,
    secondName,
    email,
    userType,
    sexo,
    estatura,
    fechaDeNacimiento
}) {
    const [state, dispatch] = useFormState(codeAuthorization, undefined);



    return (
        <article>
            <form action={dispatch} >

                <div className="mb-4">
                    <Input
                        placeholder="Nombre"
                        value={firstName}
                        name="name"
                    />
                </div>

                <div className="mb-4">
                    <Input
                        placeholder="Apellido"
                        value={secondName}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        placeholder="Email"
                        value={email}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        placeholder="Tipo"
                        value={userType}
                        readOnly
                        style={{ cursor: 'not-allowed' }}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        placeholder="Sexo"
                        value={sexo}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        placeholder="Estatura"
                        value={estatura}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        placeholder="Fecha de Nacimiento"
                        value={fechaDeNacimiento}
                    />
                </div>
                <Button
                    type="submit"
                >
                    Activar Código
                </Button>
            </form>
        </article>
    );
}