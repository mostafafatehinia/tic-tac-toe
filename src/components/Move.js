export function Move ( { histories, jumpTo } ) {

    const moves = histories.map( ( step, move ) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={ move }>
                <button onClick={ () => jumpTo( move ) } >{ desc }</button>
            </li>
        );
    } );
    return (
        <div>
            { moves }
        </div>
    )
}