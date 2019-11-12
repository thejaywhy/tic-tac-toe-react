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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  whosNext() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    // Return early if there's already a winner
    // or square is already set
    if ( calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.whosNext();
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);

    let status = null;
    if (winner) {
      status = 'Winner: ' + winner
    }
    else {
      status = 'Next Player: ' + this.whosNext();
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <div>{/* TODO */}</div>
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