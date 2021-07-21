export function Reset ( { resetHistory, resetIsXNext } ) {
    const handleReset = () => {
        resetHistory( [ Array( 9 ).fill( null ) ] )
        resetIsXNext( () => {
            return Math.random() < 0.5
        } )
        document.getElementById( 'confetti-canvas' ).style.visibility = 'hidden';
    }
    return (
        <>
            <button className='reset' onClick={ handleReset }>Reset</button>
        </>
    );
}