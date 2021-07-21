export function Reset ( { resetHistory, resetIsXNext } ) {
    const handleReset = () => {
        resetHistory( [ Array( 9 ).fill( null ) ] )
        resetIsXNext( () => {
            return Math.random() < 0.5
        } )
    }
    return (
        <>
            <button className='reset' onClick={ handleReset }>Reset</button>
        </>
    );
}