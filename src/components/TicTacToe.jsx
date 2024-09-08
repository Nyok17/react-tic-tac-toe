import React, { useEffect, useState } from 'react';
import '../styles.css';


const TicTacToe = () => {
    const[squares, setSquares]= useState(Array(9).fill(''));
    const[xTurn, setXTurn]=  useState(true);
    const[status, setStatus]= useState('');


    const getWinner=(squares)=>{
        const lines=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for(let i=0; i < lines.length; i++){
            const[x, y, z]= lines[i]

            if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z]){
                return squares[x];
            }
        }
        return null;
    }


    const handleGame=(currentIndex)=>{
        let copySquares=[...squares];
        if(copySquares[currentIndex] || getWinner(copySquares)) return;
            copySquares[currentIndex]= xTurn ? 'X' : 'O';

            setSquares(copySquares)
            setXTurn(!xTurn)
        console.log(currentIndex);
    }


    useEffect(()=>{
        if(!getWinner(squares) && squares.every(item=> item !== '')){
           setStatus('This is a draw! Please restart the game')
        }else if(getWinner(squares)){
            setStatus(`Winner is: ${getWinner(squares)}, Please restart the game`)
        }else{
           return setStatus(`Next play is:${xTurn ? 'X' : 'O'}`);
        }
       
    }, [squares, xTurn])

   
  return (
    <div>
    <div className='container'>
        {
            squares.map((square, index)=>(
                <div className='squares' id={index} key={index} onClick={()=>{ 
                    handleGame(index)}}>
                    <span>{square}</span>
                </div>
            ))
        }
    </div>
    <h1>{status}</h1>
    <button
    onClick={()=>{
        setSquares(Array(9).fill(''))
    }}
    >Restart</button>
    </div>
  )
}

export default TicTacToe