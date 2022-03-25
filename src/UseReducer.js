import React from "react";

const SECURITY_CODE = 'valp';

export const UseRedcuer = ({ name }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                state.value === SECURITY_CODE
                    ? dispatch({ type: 'CONFIRM' })
                    : dispatch({ type: 'ERROR' });  
            }, 1500);
        }
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
    
                {(state.error && !state.loading) && <p>Error: El código es incorrecto</p>}
                {state.loading && <p>Cargando...</p>}
    
                <input 
                    value={state.value}
                    placeholer="Código de seguridad"
                    onChange={(event) => dispatch({ 
                        type: 'WRITE', 
                        payload: event.target.value
                    })} />
                <button onClick={() => dispatch({ type: 'CHECK' })}>Comprobar</button>
            </div>        
        )        
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <p>Pedimos confirmación, ¿Estás seguro?</p>
                <button onClick={() => dispatch({ type: 'DELETE' })}>Si, eliminar</button>
                <button onClick={() => dispatch({ type: 'RESET' })}>No, me arrepentí</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={() => dispatch({ type: 'RESET' })}>Recuperar</button>
            </>
        )
    }
} 

const initialState = {
    value: '',
    error: false, 
    loading: false,
    deleted: false,
    confirmed: false
};

const reducerObject = (state, payload) => ({
    'CONFIRM': { 
        ...state, 
        error: false,
        loading: false,
        confirmed: true,
    },
    'ERROR': {
        ...state, 
        error: true,
        loading: false
    },
    'WRITE': {
        ...state, 
        value: payload
    },
    'CHECK': {
        ...state, 
        loading: true 
    },
    'DELETE': {
        ...state, 
        deleted: true 
    },
    'RESET': {
        ...state, 
        deleted: false, 
        confirmed: false, 
        value: '' 
    }
});

const reducer = (state, action) => {
    return (reducerObject(state)[action.type])
        ? reducerObject(state, action.payload)[action.type]
        : state;
};