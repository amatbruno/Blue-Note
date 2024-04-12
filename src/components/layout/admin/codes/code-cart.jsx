"use client"

import Button from "@/components/ui/button";
import { generateCodeByType } from "@/lib/data";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function CodeCart({
    codeType,
    usesLeft,
    singerRol
}) {
    const [state, dispatch] = useFormState(generateCodeByType, undefined)
    const [type, setType] = useState("undefined");

    const handleCodeTypeChange = (event) => {
        setType(event.target.value);
    };

    return <article className="border p-5 rounded flex flex-col gap-5 rounded">

        <form
            action={dispatch}
        >
            <div>
                <label>
                    Seleccionar Rol:
                    <select value={codeType} name="type" onChange={handleCodeTypeChange}>
                        <option value="undefined">Undefined</option>
                        <option value="admin">admin</option>
                        <option value="director">director</option>
                        <option value="singer">singer</option>
                        <option value="temp">temp</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Veces util:
                    <select value={usesLeft} name="uses">
                        {[...Array(10).keys()].map((number) => (
                            <option key={number + 1} value={number + 1}>
                                {number + 1}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {
                state && <p className="text-red-500">
                    * {state}
                </p>
            }

            <Button
                type="submit"
            >
                Generar código
            </Button>
        </form>
    </article>
}