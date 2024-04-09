import React from 'react'

function Voice({ nombre, apellidos, cuerda, email }) {
    return (
        <div>
            <h1>{nombre}</h1>
            <h1>{apellidos}</h1>
            <h2>{cuerda}</h2>
            <h3>{email}</h3>
        </div>
    )
}

export default Voice