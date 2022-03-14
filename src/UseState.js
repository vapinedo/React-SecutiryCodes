import React from "react";

const SECURITY_CODE = 'valp';
const initialState = {
    value: '',
    error: false, 
    loading: false
};

export const UseState = ({ name }) => {
    const [state, setState] = React.useState(initialState);

    console.log(state);

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    setState({ 
                        ...state, 
                        error: false,
                        loading: false
                    })
                } else {
                    setState({ 
                        ...state, 
                        error: true,
                        loading: false
                    })
                }
            }, 1500);
        }
    }, [state.loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>

            {(state.error && !state.loading) && <p>Error: El código es incorrecto</p>}
            {state.loading && <p>Cargando...</p>}

            <input 
                value={state.value}
                placeholer="Código de seguridad"
                onChange={(event) => setState({ ...state, value: event.target.value })} />
            <button onClick={() => setState({ ...state, loading: true })}>Comprobar</button>
        </div>        
    )
} 