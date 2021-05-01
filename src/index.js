import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) { // Square 由 class 改成函数组件
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
// class Square extends React.Component {
//     // constructor(props) {//构造函数-》state 用来记住状态
//     //     super(props);//在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法
//     //     this.state = {
//     //         state:null,
//     //     };
//     // }

//     render() {
//       return (
//         // <button className="square" onClick={function() {alert('点击了button');}} > //等价于下面方式
//         <button className="square" onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
// }

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null), // 注意Array(9) 而不是 Array[9]
            xIsNext: true,
        };
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }
    handleClick(i) {
        const temp_squares = this.state.squares.slice();
        if (calculateWinner(temp_squares) || temp_squares[i]) {
            return;
        }
        temp_squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: temp_squares,
            xIsNext: !this.state.xIsNext
        });
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);