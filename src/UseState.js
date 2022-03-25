import React from "react";

const SECURITY_CODE = 'valp';
const initialState = {
    value: '',
    error: false, 
    loading: false,
    deleted: false,
    confirmed: false
};

export const UseState = ({ name }) => {
    const [state, setState] = React.useState(initialState);

    const onConfirm = () => {
        setState({ 
            ...state, 
            error: false,
            loading: false,
            confirmed: true,
        })
    };

    const onError = () => {
        setState({ 
            ...state, 
            error: true,
            loading: false
        })
    };

    const onWrite = (newValue) => {
        setState({ 
            ...state, 
            value: newValue 
        });
    }

    const onCheck = () => {
        setState({ 
            ...state, 
            loading: true 
        });
    };

    const onDelete = () => {
        setState({ 
            ...state, 
            deleted: true 
        });
    };

    const onReset = () => {
        setState({ 
            ...state, 
            deleted: false, 
            confirmed: false, 
            value: '' 
        });
    };

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
                    onChange={(event) => onWrite(event.target.value)} />
                <button onClick={() => onCheck()}>Comprobar</button>
            </div>        
        )        
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <p>Pedimos confirmación, ¿Estás seguro?</p>
                <button onClick={() => onDelete()}>Si, eliminar</button>
                <button onClick={() => onReset()}>No, me arrepentí</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={() => onReset()}>Recuperar</button>
            </>
        )
    }
} 