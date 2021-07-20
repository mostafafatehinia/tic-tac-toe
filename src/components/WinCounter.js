export function WinCounter ( { xWins, oWins } ) {
    return (
        <>
            <h2 className='mobile-view'>Player X : { xWins } Times Wins.</h2>
            <h2 className='mobile-view'>Player O : { oWins } Times Wins.</h2>
        </>
    );
}