import React, { useState, useEffect } from 'react'
import { Board } from './Board';
import { Message } from './Message';
import { Reset } from './Reset';
import { calculateWinner } from '../utils/calculate';
import { Move } from './Move';
import { WinCounter } from './WinCounter';

const initialPlayer = Math.random() < 0.5

export function Game () {
    const [ history, setHistory ] = useState( [ Array( 9 ).fill( null ) ] );
    const [ stepNumber, setStepNumber ] = useState( 0 );
    const [ isXNext, setIsXNext ] = useState( initialPlayer );
    const [ messageContent, setMessageContent ] = useState( '' );
    const [ xWinCounter, setXWinCounter ] = useState( () => localStorage.getItem( 'xWins' ) || '0' )
    const [ oWinCounter, setOWinCounter ] = useState( () => localStorage.getItem( 'oWins' ) || '0' )
    const allHistories = history.slice( 0, stepNumber + 1 );
    const currentHistory = allHistories[ allHistories.length - 1 ];
    const currentSquares = currentHistory.slice();
    let winCheck = calculateWinner( currentSquares );
    let message;

    useEffect( () => {
        if ( winCheck === 'Tie' ) {
            message = 'Game Tie.'
        } else {
            if ( winCheck ) {
                message = !isXNext ? 'Player X Wins.' : 'Player O Wins.';
                if ( winCheck === 'X' ) {
                    localStorage.setItem( 'xWins', +( xWinCounter ) + 1 )
                    setXWinCounter( () => localStorage.xWins )
                }
                if ( winCheck === 'O' ) {
                    localStorage.setItem( 'oWins', +( oWinCounter ) + 1 )
                    setOWinCounter( () => localStorage.oWins )
                }
                document.getElementById( 'confetti-canvas' ).style.visibility = 'visible';
            }
            else {
                message = 'Next Player : ' + ( isXNext ? 'X' : 'O' );
            }
        }
        setMessageContent( message )
    }, [ history, isXNext ] )


    const handleClick = ( i ) => {
        if ( winCheck || currentSquares[ i ] ) {
            return;
        }

        currentSquares[ i ] = isXNext ? 'X' : 'O';
        setHistory( ( previusHistory ) => {
            return [ ...previusHistory, currentSquares ]
        } )
        setStepNumber( history.length )
        setIsXNext( !isXNext )
    }

    const clearCache = () => {
        localStorage.setItem( 'xWins', '0' )
        setXWinCounter( localStorage.xWins )
        localStorage.setItem( 'oWins', '0' )
        setOWinCounter( localStorage.oWins )
    }

    const jumpTo = ( step ) => {
        setStepNumber( step )
        setHistory( ( previusHistory ) => {
            return [ ...previusHistory.slice( 0, step + 1 ) ]
        } )
        setIsXNext( ( previusState ) => {
            if ( step % 2 === 0 ) {
                return previusState
            } else {
                return !previusState
            }
        } )
    }
    return (
        <>
            <div className="section">
                <Board squares={ currentSquares } onClick={ handleClick } />
                <Message content={ messageContent } />
                <Reset resetHistory={ setHistory } resetIsXNext={ setIsXNext } />
            </div>
            <div className="section">
                <WinCounter xWins={ localStorage.xWins } oWins={ localStorage.oWins } />
                <button className='reset' onClick={ clearCache }>Clear Cache</button>
                <Move histories={ allHistories } jumpTo={ jumpTo } />
            </div>
        </>
    );
}

