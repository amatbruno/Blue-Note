"use client"

import Button from "@/components/ui/button";
import { generateCodeByType } from "@/lib/data";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";

export default function CodeCart({
    codeType,
    usesLeft,
    singerRol
}) {
    const [state, dispatch] = useFormState(generateCodeByType, undefined);
    const [type, setType] = useState("undefined");
    const [emails, setEmails] = useState([]);
    const [emailInput, setEmailInput] = useState("");

    const handleCodeTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleEmailInputChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handleEmailInputKeyDown = (event) => {
        if (event.key === ' ' && emailInput.trim() !== '') {
            setEmails((prevEmails) => [...prevEmails, emailInput.trim()]);
            setEmailInput("");
        }
    };

    const handleRemoveEmailClick = () => {
        setEmails((prevEmails) => {
            // Retorna todos los correos electrónicos excepto el último
            return prevEmails.slice(0, -1);
        });
    };

    return (
        <article className="border p-5 flex flex-col gap-5 rounded">
            <form action={dispatch}>
                <div>
                    <label>
                        Seleccionar Rol:
                        <select value={codeType} name="type" onChange={handleCodeTypeChange}>
                            <option value="undefined">Undefined</option>
                            <option value="admin">admin</option>
                            <option value="singer">singer</option>
                            <option value="temp">temp</option>
                        </select>
                    </label>
                </div>

                {type === "singer" && (
                    <div>
                        <label>
                            Opción de cuerda:
                            <select value={singerRol} name="singerRol" onChange={() => {}}>
                                <option value="SOPRANO">SOPRANO</option>
                                <option value="ALTO">ALTO</option>
                                <option value="TENOR">TENOR</option>
                                <option value="BAJO">BAJO</option>
                            </select>
                        </label>
                    </div>
                )}

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

                <div>
                    <label>
                        Correos electrónicos:
                        <div className="email-input-container">
                            {emails.map((email, index) => (
                                <div key={index} className="email-bubble">
                                    {email}
                                    <button type="button" onClick={() => handleRemoveEmailClick(index)}></button>
                                </div>
                            ))}
                            <input
                                type="text"
                                value={emailInput}
                                onChange={handleEmailInputChange}
                                onKeyDown={handleEmailInputKeyDown}
                                placeholder="Añadir correos electrónicos"
                                className="email-input"
                            />
                        </div>
                    </label>
                </div>

                {state && <p className="text-red-500">* {state}</p>}

                <Button type="submit">Generar código</Button>
            </form>
            <style jsx>{`
                .email-input-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    border: 1px solid #ccc;
                    padding: 0.5rem;
                    border-radius: 4px;
                }
                .email-bubble {
                    display: flex;
                    align-items: center;
                    background-color: #e0e0e0;
                    border-radius: 12px;
                    padding: 0.2rem 0.5rem;
                }
                .email-bubble button {
                    background: var(--customRed);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    height: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                }
                .email-input {
                    border: none;
                    outline: none;
                    flex-grow: 1;
                }
            `}</style>
        </article>
    );
}
