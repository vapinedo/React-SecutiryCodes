import React from "react";

export const UseState = ({ name }) => {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("Empezando el efecto");

        if (loading) {
            setTimeout(() => {
                console.log("Haciendo la validación");
                setLoading(false);
                console.log("Terminando la validación");
            }, 3000);
        }

        console.log("Terminando el efecto");
    }, [loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>

            {error && <p>Error: El código es incorrecto</p>}
            {loading && <p>Cargando...</p>}

            <input placeholer="Código de seguridad" />
            <button onClick={() => setLoading(true)}>Comprobar</button>
        </div>        
    )
}