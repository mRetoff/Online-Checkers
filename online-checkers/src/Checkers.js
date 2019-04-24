import React, { Component } from 'react';
import './Checkers.css';

class Checkers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [[0, 1, 0, 0, 0, 2, 0, 2],
      [1, 0, 1, 0, 0, 0, 2, 0],
      [0, 1, 0, 0, 0, 2, 0, 2],
      [1, 0, 1, 0, 0, 0, 2, 0],
      [0, 1, 0, 0, 0, 2, 0, 2],
      [1, 0, 1, 0, 0, 0, 2, 0],
      [0, 1, 0, 0, 0, 2, 0, 2],
      [1, 0, 1, 0, 0, 0, 2, 0]],
      px: 0,
      py: 0,
      ipos: null,
      combo: false,
      player: 0,
      win: -1,
    };
    this.value = this.valid.bind(this);
    this.move = this.move.bind(this);
    this.update_board = this.update_board.bind(this);
    this.yield = this.yield.bind(this);
    this.reset = this.reset.bind(this);
  }

  valid(ix, iy, fx, fy) {

    // are you moving to the same position
    if (ix === fx && iy === fy) {
      return false;
    }

    // v is the value of the piece you tried to move
    let v = this.state.board[ix][iy];

    // are you capturing more than one piece?
    if (this.state.combo) {
      console.log("COMBO");
      if (ix !== this.state.px || iy !== this.state.py) {
        return true;
      }
      if (Math.abs(fx - ix) !== 2 || Math.abs(fy - iy) !== 2) {
        return true;
      }
      console.log("PASSED");
      let j = 0;
      let c = [0, 0];
      if (ix < fx) {
        if (iy < fy) {
          j = this.state.board[ix + 1][iy + 1];
          c[0] = 1;
          c[1] = 1;
        } else {
          j = this.state.board[ix + 1][iy - 1];
          c[0] = 1;
          c[1] = -1;
        }
      } else {
        if (iy < fy) {
          j = this.state.board[ix - 1][iy + 1];
          c[0] = -1;
          c[1] = 1;
        } else {
          j = this.state.board[ix - 1][iy - 1];
          c[0] = -1;
          c[1] = -1;
        }
      }
      if (j > 0 && j % 2 !== this.state.player) {
        this.state.board[ix][iy] = 0;
        this.state.board[ix + c[0]][iy + c[1]] = 0;
        this.state.board[fx][fy] = v;
      }
      return false;
    }

    // shallow validity
    if ((v % 2) !== this.state.player || this.state.board[fx][fy] !== 0) {
      return false;
    }

    if (Math.abs(fx - ix) === 1 && Math.abs(fy - iy) === 1) {
      if (fy > iy && this.state.player == 1 ||
        fy < iy && this.state.player == 0 ||
        this.state.board[ix][iy] > 2) {
        this.state.board[ix][iy] = 0;
        if (fy == 0 || fy == 7) {
          v += 2;
        }
        this.state.board[fx][fy] = v;
        return true;
      }
      return false;
    }

    // capture

    if (Math.abs(fx - ix) === 2 && Math.abs(fy - iy) === 2) {
      let j = 0;
      let c = [0, 0];
      if (ix < fx) {
        if (iy < fy) {
          j = this.state.board[ix + 1][iy + 1];
          c[0] = 1;
          c[1] = 1;
        } else {
          j = this.state.board[ix + 1][iy - 1];
          c[0] = 1;
          c[1] = -1;
        }
      } else {
        if (iy < fy) {
          j = this.state.board[ix - 1][iy + 1];
          c[0] = -1;
          c[1] = 1;
        } else {
          j = this.state.board[ix - 1][iy - 1];
          c[0] = -1;
          c[1] = -1;
        }
      }
      if (j > 0 && j % 2 !== this.state.player) {
        if (fy == 0 || fy == 7) {
          v += 2;
        }
        this.state.board[ix][iy] = 0;
        this.state.board[ix + c[0]][iy + c[1]] = 0;
        this.state.board[fx][fy] = v;
        this.px = fx;
        this.py = fy;
        this.setState({ combo: true });
        this.ipos = null;
      }
      return false;
    }
    return false;
  }

  update_board() {
    if (this.props.currentUser) {
      let totals = [0, 0];
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.state.board[i][j] === 0) {
            continue;
          }
          totals[this.state.board[i][j] % 2]++;
        }
      }
      if (totals[1] === 0) {
        this.setState({ win: 0 });
      } else if (totals[0] === 0) {
        this.setState({ win: 1 });
      }
      let c = document.getElementById("theCanvas");
      let bw = c.width;
      let sw = bw / 8;
      let context = c.getContext("2d");
      for (let i = 0; i < 64; i++) {

        // draw board
        let color;
        let x = (i >> 3);
        let y = (i % 8);
        if (x % 2) {
          if (y % 2) {
            color = "#FFFFFF";
          } else {
            color = "#000000";
          }
        } else {
          if (y % 2) {
            color = "#000000";
          } else {
            color = "#FFFFFF";
          }
        }
        context.fillStyle = color;
        context.fillRect(x * sw, y * sw, sw, sw);

        // draw pieces
        let v = this.state.board[x][y];
        if (v > 0 && v % 2 === 0) {
          context.beginPath();
          context.arc(x * sw + (sw / 2), y * sw + (sw / 2), 144 * sw / 377, 0, Math.PI * 2, false);
          context.fillStyle = "#443022";
          context.fill();
        } else if (v % 2 === 1) {
          context.beginPath();
          context.arc(x * sw + (sw / 2), y * sw + (sw / 2), 144 * sw / 377, 0, Math.PI * 2, false);
          context.fillStyle = "#855E42";
          context.fill();
        }
        if (v > 2) {
          context.beginPath();
          context.arc(x * sw + (sw / 2), y * sw + (sw / 2), 144 * sw / 610, 0, Math.PI * 2, false);
          context.fillStyle = "#FFD700";
          context.fill();
        }

      }
    }
  }

  move(e) {
    let rect = e.target.getBoundingClientRect();
    let bw = e.target.width;
    let sw = bw / 8;
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor(x / sw);
    y = Math.floor(y / sw);
    console.log(x);
    console.log(y);
    if (!this.state.ipos) {
      this.state.ipos = [x, y];
    } else {
      console.log("try move");
      if (this.valid(this.state.ipos[0], this.state.ipos[1], x, y)) {
        console.log("valid");
        this.props.onPlayerChange((this.state.player + 1) % 2);
        this.setState({ player: (this.state.player + 1) % 2 });
        console.log(this.state.player)
        //this.state.ipos = null;
      }
      this.state.ipos = null
      this.update_board();
    }
  }

  yield() {
    this.setState({ combo: false });
    this.state.player = (this.state.player + 1) % 2;
    this.props.onPlayerChange(this.state.player);
    this.state.ipos = null;
  }

  reset() {
    this.setState({
      board: [[0, 1, 0, 0, 0, 2, 0, 2],
      [1, 0, 1, 0, 0, 0, 2, 0],
      [0, 1, 0, 0, 0, 2, 0, 2],
      [1, 0, 1, 0, 0, 0, 2, 0],
      [0, 1, 0, 0, 0, 2, 0, 2],
      [1, 0, 1, 0, 0, 0, 2, 0],
      [0, 1, 0, 0, 0, 2, 0, 2],
      [1, 0, 1, 0, 0, 0, 2, 0]],
      px: 0,
      py: 0,
      ipos: null,
      combo: false,
      player: 0,
    });
    this.update_board();
  }

  componentDidMount() {
    this.props.winCondition(this.state.win);
  }

  render() {
    return (
      <div id="board">
        <canvas id="theCanvas" width="512" height="512" onClick={this.move}>
        </canvas>
        <button id="startB" onClick={this.update_board}>
          START
       </button>
        <button id="yieldB" onClick={this.yield}>
          YIELD
       </button>
        <button id="resetB" onClick={this.reset}>
          RESET
       </button>
      </div>
    );
  }

}

export default Checkers;
