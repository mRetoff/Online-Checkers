import React, { Component } from 'react';

class Checkers extends Component {

  constructor(props) {
    //this.you = p1; 
    //this.them = p2;
    /*
    this.turn = s;
    if (this.turn) {
      this.color = "black";
    } else {
      this.color = "white";
    }
    */
    super(props);
    this.board = [[1,0,1,0,0,0,2,0],
                  [0,1,0,0,0,2,0,2],
                  [1,0,1,0,0,0,2,0],
                  [0,1,0,0,0,2,0,2],
                  [1,0,1,0,0,0,2,0],
                  [0,1,0,0,0,2,0,2],
                  [1,0,1,0,0,0,2,0],
                  [0,1,0,0,0,2,0,2]];
    this.px = 0;
    this.py = 0;
  }
  
  /* 
  play() {
    if (this.turn) {
      //wait for player to move
      //check validity of move
      //check(ix, iy, fx, fy);
      //update board
      //send move to opponent
      //wait for oponent to confirm
    } else {
      //wait for other player to move
      //confirm receipt of move
    }
  }

  Move(ix, iy, fx, fy) {

    // are you moving to the same position
    if (ix === fx && iy === fy) {
      return false;
    }

    // v is the value of the piece you tried to move
    let v = this.board[ix][iy];

    // are you capturing more than one piece?
    if (this.combo) {
      if (ix !== this.px || iy !== this.py) {
        return false;
      } 
      if (Math.abs(fx - ix) !== 2 || Math.abs(fy - iy) !== 2) {
        return false;
      }
      let j = 0;
      let c = [0, 0];
      if (ix < fx) {
        if (iy < fy) {
          j = this.board[ix+1][iy+1];
          c[0] =  1; 
          c[1] =  1;
        } else {
          j = this.board[ix+1][iy-1];
          c[0] =  1; 
          c[1] = -1;
        }
      } else {
        if (iy < fy) {
          j = this.board[ix-1][iy+1];
          c[0] = -1; 
          c[1] =  1;
        } else {
          j = this.board[ix-1][iy-1];
          c[0] = -1;
          c[1] = -1;
        }
      }
      if (j > 0 && j % 2 === 0) {
        this.move.push([ix, iy]);
        this.move.push(0);
        this.move.push([ix+c[0], iy+c[1]]);
        this.move.push(0);
        this.move.push([fx, fy]); 
        this.move.push(v);
        this.update(this.move);
      }
      return false;
    }

    // is this your piece?
    if ((v % 2) !== 1 || this.board[fx][fy] !== 0) {
      return false;
    }

    // move normally
    if (ix === fx) {
      if ((iy - 1) === fy) {
        if (v === 3) {
          this.move = [[ix, iy], 0, [fx, fy], v];
          this.turn = false;
          this.update(this.move);
          //send(move);
          return true;
        }
        return false;
      }
      if ((iy + 1) === fy) {
        if (fy === 7) {
          this.move = [[ix, iy], 0, [fx, fy], 3];
          this.turn = false;
          this.update(this.move);
          //send(move);
          return true;
        }
        this.move = [[ix, iy], 0, [fx, fy], v];
        this.turn = false;
        this.update(this.move);
        //send(move);
        return true; 
      }
      return false; 
    } 

    // move king normally
    if (iy === fy) {
      if (v !== 3 || Math.abs(fy - iy) !== 1) {
        return false;
      } 
      this.move = [[ix, iy], 0, [fx, fy], v];
      this.turn = false;
      this.update(this.move);
      //send(move);
      return true;
    }

    // capture
    if (Math.abs(fx - ix) === 2 && Math.abs(fy - iy) === 2) {
      let j = 0;
      let c = [0, 0];
      if (ix < fx) {
        if (iy < fy) {
          j = this.board[ix+1][iy+1];
          c[0] =  1; 
          c[1] =  1;
        } else {
          j = this.board[ix+1][iy-1];
          c[0] =  1; 
          c[1] = -1;
        }
      } else {
        if (iy < fy) {
          j = this.board[ix-1][iy+1];
          c[0] = -1; 
          c[1] =  1;
        } else {
          j = this.board[ix-1][iy-1];
          c[0] = -1;
          c[1] = -1;
        }
      }
      if (j > 0 && j % 2 === 0) {
        this.move = [[ix, iy], 0, [c[0], c[1]], 0, [fx, fy], v];
        this.update(this.move);
        this.combo = true;
      }
      return false;
    }

    return false;
  }

  update(move) {
    let l = (move.length >> 1);
    for (let i = 0; i < l; i++) {
      let pos = move[i*2];
      let val = move[i*2+1];
      this.board[pos[0]][pos[1]] = val;
    }
  }
  */
 
    

  test(e) {
    let c = document.getElementById("theCanvas");
    let context = c.getContext("2d");
    for (let i = 0; i < 64; i++) {
      if ((i >> 3) % 2) {
        if (i % 2) {
          context.fillStyle = "#FFFFFF";
        } else {
          context.fillStyle = "#000000";
        }
      } else {
        if (i % 2) {
          context.fillStyle = "#000000";
        } else {
          context.fillStyle = "#FFFFFF";
        }
      }
      context.fillRect((i % 8) * 32, (i >> 3) * 32, 32, 32);
    }
  }
 
  render() {
    return (
     <div id="board">
       <button onClick={this.test.bind(this)}> 
         TEST
       </button>
       <canvas id="theCanvas" width="256" height="256">
       </canvas>
     </div> 
    );
  }

}

export default Checkers;
