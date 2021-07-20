import React from 'react'


export function Message ( { content } ) {
    return (
        <>
            <p className='game-info'>{ content }</p>
        </>
    );
}