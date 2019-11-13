import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square(props) {
  return (
      <button
        className="square"
        onClick={props.onClick}
      >
        {props.value}
      </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  whosNext() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  handleClick(i) {
    const history = this.state.history.slice(
      0,
      this.state.stepNumber + 1
    );
    const current = history[history.length -1];
    const squares = current.squares.slice();

    // Return early if there's already a winner
    // or square is already set
    if ( calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.whosNext();
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares)
    const stepNumber = this.state.stepNumber;

    const moves = history.map((step, move) => {
      let desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            { move === stepNumber
              ? <strong>{desc}</strong>
              : desc
            }
          </button>
        </li>
      );
    });

    let status = null;
    if (winner) {
      status = 'Winner: ' + winner
    }
    else {
      status = 'Next Player: ' + this.whosNext();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
  // the winning combinations in the game
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // iterate over lines to determine if we have a winner
  for (let i = 0; i < lines.length; i++ ) {
    const [a, b, c] = lines[i];

    // if a is not null, and it matches b and c, we must have a winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  // return null, ie no winner
  return null;
}

// Now add to DOM
ReactDOM.render(
  <Game />,
  document.getElementById('root')
)