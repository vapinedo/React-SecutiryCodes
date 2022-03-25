import React from "react";

const SECURITY_CODE = 'valp';

export const UseRedcuer = ({ name }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onReset = () => dispatch({ type: actionTypes.reset });

    const onWrite = ({ target: { value } }) => {
        dispatch({ type: actionTypes.write, payload: value });
    }

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                state.value === SECURITY_CODE
                    ? onConfirm()
                    : onError();  
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
                    onChange={onWrite} />
                <button onClick={onCheck}>Comprobar</button>
            </div>        
        )        
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <p>Pedimos confirmación, ¿Estás seguro?</p>
                <button onClick={onDelete}>Si, eliminar</button>
                <button onClick={onReset}>No, me arrepentí</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>Recuperar</button>
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

const actionTypes = {
    confirm:    'CONFIRM',
    error:      'ERROR',
    write:      'WRITE',
    check:      'CHECK',
    delete:     'DELETE',
    reset:      'RESET',
};

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: { 
        ...state, 
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state, 
        error: true,
        loading: false
    },
    [actionTypes.write]: {
        ...state, 
        value: payload
    },
    [actionTypes.check]: {
        ...state, 
        loading: true 
    },
    [actionTypes.delete]: {
        ...state, 
        deleted: true 
    },
    [actionTypes.reset]: {
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