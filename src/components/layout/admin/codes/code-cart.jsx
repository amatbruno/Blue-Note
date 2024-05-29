"use client";

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

    const handleRemoveEmailClick = (index) => {
        setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
    };

    return (
        <div className="relative min-h-screen flex items-start justify-center pt-20 bg-gradient">
            <article className="relative z-10 border p-5 flex flex-col gap-5 rounded shadow-lg bg-white max-w-md mx-auto">
                <form action={dispatch} className="flex flex-col gap-5">
                    <div>
                        <label className="block mb-2 text-gray-700">
                            Seleccionar Rol:
                            <select
                                value={codeType}
                                name="type"
                                onChange={handleCodeTypeChange}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="undefined">Undefined</option>
                                <option value="admin">Admin</option>
                                <option value="singer">Singer</option>
                                <option value="temp">Temp</option>
                            </select>
                        </label>
                    </div>

                    {type === "singer" && (
                        <div>
                            <label className="block mb-2 text-gray-700">
                                Opción de cuerda:
                                <select
                                    value={singerRol}
                                    name="singerRol"
                                    onChange={() => {}}
                                    className="block w-full mt-1 p-2 border border-gray-300 rounded"
                                >
                                    <option value="SOPRANO">Soprano</option>
                                    <option value="ALTO">Alto</option>
                                    <option value="TENOR">Tenor</option>
                                    <option value="BAJO">Bajo</option>
                                </select>
                            </label>
                        </div>
                    )}

                    <div>
                        <label className="block mb-2 text-gray-700">
                            Veces util:
                            <select
                                value={usesLeft}
                                name="uses"
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                {[...Array(10).keys()].map((number) => (
                                    <option key={number + 1} value={number + 1}>
                                        {number + 1}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700">
                            Correos electrónicos:
                            <div className="email-input-container mt-1 flex flex-wrap items-center p-2 border border-gray-300 rounded">
                                {emails.map((email, index) => (
                                    <div key={index} className="email-bubble mr-2 mb-2 flex items-center bg-gray-200 px-2 py-1 rounded-full">
                                        {email}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEmailClick(index)}
                                            className="ml-2 text-red-500"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    value={emailInput}
                                    onChange={handleEmailInputChange}
                                    onKeyDown={handleEmailInputKeyDown}
                                    placeholder="Añadir correos electrónicos"
                                    className="email-input flex-grow p-1 outline-none border-none"
                                />
                            </div>
                        </label>
                    </div>

                    {state && <p className="text-red-500">* {state}</p>}

                    <Button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                        Generar código
                    </Button>
                </form>
            </article>

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
                    background: none;
                    color: red;
                    border: none;
                    cursor: pointer;
                }
                .email-input {
                    border: none;
                    outline: none;
                    flex-grow: 1;
                }
            `}</style>
        </div>
    );
}
