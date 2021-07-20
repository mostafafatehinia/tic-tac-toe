import React from 'react'

export function Square ( { value, onClick } ) {
    return (
        <>
            <button onClick={ onClick } className="square">{ value }</button>
        </>
    );
}