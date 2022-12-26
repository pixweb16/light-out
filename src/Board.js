import React, {Component} from "react";
import Cell from "./Cell";
import './css/Board.css';
import {randCells} from './helpers';

// Game board of Lights out.
class Board extends Component {

  // Default props
  static defaultProps = {
    ncols : 5,
    nrows : 5,
    cell_lightOn_probability : 0.2  // (20%) that the cell are light on
  }

  // Constructor with props
  constructor(props) {
    super(props);
    this.state = {
      board: randCells(this.props.ncols, this.props.nrows, this.props.cell_lightOn_probability),
      hasWon: false
    }
  }

  // handle cell clicking: update cells state & determine if you have win
  flipCellsAround = (coord) => {

    let {ncols, nrows} = this.props;
    let newBoard = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    
    // check if this coord is actually on board, and flip it    
    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }

    flipCell(y,x)     // flip the current cell
    flipCell(y-1,x)   // flip the hupper cell
    flipCell(y+1,x)   // flip the lower cell
    flipCell(y,x-1)   // flip the left cell
    flipCell(y,x+1)   // flip theright cell

    // determine is the game has been won, check if all cells are false
    let newHasWon = newBoard.every( row => row.every(cell => cell===false) )
    
    // setting the new state
    this.setState(currentSt =>({board: newBoard, hasWon: newHasWon}) )
  }



  render() {
    
    // generate cells render
    let cellRender = [];
    for (let y=0 ; y<this.props.nrows ; y++ ) {
      let row = [];
        
      for (let x=0 ; x<this.props.ncols ; x++ ) {
          row.push(<Cell      key={`${y}-${x}`} 
                              coord={`${y}-${x}`}
                              isLit={this.state.board[y][x]} 
                              flipCellsAround={this.flipCellsAround}/> )
      }
      cellRender.push(<tr key={y}>{row}</tr> );
    }
    
    // winning msg render
    let winMsg = <h3 className="winMsg">Congratulation You Win <span role="img" aria-label="happy">😃</span></h3>

    // RENDER
    return ( 
        <div className="Board">
          <h2 className="Board-title"><span className="neon-orange">Light </span><span className="neon-blue">Out</span></h2>
          <table>
            <tbody>
              { // Render cells IF not winning yet
                !(this.state.hasWon) && cellRender
              }              
            
            </tbody>
          </table>
          { // Render winning msg if you win
            this.state.hasWon && winMsg
          }
        </div>
    )
  }
}

export default Board;