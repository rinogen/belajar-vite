/* eslint-disable react/prop-types */
import { useState } from 'react'

function Square({value, onSquareClick}){
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

//fungsi pencarian pemenang bukan bagian dari kompomem board
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6] //diagonal
  ]

  for (let line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return false

}

function Board({xIsNext, squares, onPlay}) {
  
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(newSquares)
  }

  const winner = calculateWinner(squares)
  let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`
  
  return (
    <>
    <div className="status">{status}</div>
    <div className='board'>
      {Array.from({ length: 9 }, (_, i) => 
      <Square onSquareClick={()=>handleClick(i)} value={squares[i]} key={i} />)}
    </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  
  function jumpTo(nextMove){
    setCurrentMove(nextMove)  }

  function handlePlay(newSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length-1)	
  }

  const moves = history.map((squares, move) => {
    let desc = move ? `Go to move #${move}` : 'Go to game start'

    return (
      
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button> 
      </li>// kalau mangil function di dlm event yang ada paramater, harus pake arrow function agar tidak error re-render.
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
