import React, {Component} from 'react'
import "./css/Cell.css"

class Cell extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (evt) => {
    // call the board flipCellsAround function to flip cells around this cell
    this.props.flipCellsAround(this.props.coord);
  }

  render() {
    let cellStyle = "Cell" + (this.props.isLit ? " Cell-lit" : "");

    return <td className={cellStyle} onClick={this.handleClick}></td>
  }
}


export default Cell