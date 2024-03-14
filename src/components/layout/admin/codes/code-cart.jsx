"use client"

import Button from "@/components/ui/button";
import { generateCodeByType } from "@/lib/data";
import { useFormState } from "react-dom";

export default function CodeCart({
    codeType,
    usesLeft
}) {
    const [state, dispatch] = useFormState(generateCodeByType, undefined)

    return <article className="border p-5 rounded flex flex-col gap-5">
        esto es mi carta {codeType}

        <form
            action={dispatch}
        >
            {
                state && <p className="text-red-500">
                    * {state}
                </p>
            }

            <input type="hidden" defaultValue={codeType} name="type" />

            <label>
                Seleccionar Valor:
                <select value={usesLeft} name="uses">
                    {[...Array(10).keys()].map((number) => (
                        <option key={number + 1} value={number + 1}>
                            {number + 1}
                        </option>
                    ))}
                </select>
            </label>

            <Button
                type="submit"
            >
                Generar código
            </Button>
        </form>
    </article>
}