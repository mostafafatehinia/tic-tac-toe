export function Reset ( { resetHistory, resetIsXNext } ) {
    const handleReset = () => {
        resetHistory( [ Array( 9 ).fill( null ) ] )
        resetIsXNext( true )
    }
    return (
        <>
            <button className='reset' onClick={ handleReset }>Reset</button>
        </>
    );
}