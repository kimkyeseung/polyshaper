import React, { Component } from 'react';
import styles from './style/panel.module.scss';

class Panel extends Component {

  onEditmode(ev) {
    if (ev.target.checked) {
      this.props.editMode(true);
    } else {
      this.props.editMode(false);
    }
  }

  handleAutoPopulateButtonClick() {
    const backgroundVertexNode = [];
    let row = 0;
    let col = 0;
    let maxCols = this.props.backgroundMaxCols;
    let maxRows = this.props.backgroundMaxRows;
    let amount = maxCols * maxRows;
    for (let i = 0; i < amount; i++) {
      let vertex = {};
      if (row % 2 === 0) {
        vertex.x = (col * this.props.backgroundCellSize) - this.props.backgroundCellSize;
      } else {
        vertex.x = (col * this.props.backgroundCellSize) - this.props.backgroundCellSize - this.props.backgroundCellSize / 2;
      }
      vertex.x = vertex.x + (Math.random()-0.5) * this.props.backgroundVariance * this.props.backgroundCellSize * 2;
      vertex.y = (row * this.props.backgroundCellSize * 0.865) - this.props.backgroundCellSize;
      vertex.y = vertex.y + (Math.random()-0.5) * this.props.backgroundVariance * this.props.backgroundCellSize * 2;
      vertex.col = col;
      vertex.row = row;
      backgroundVertexNode.push(vertex);
      col++;
      if ((i+1) % maxCols === 0) {
        row++;
        col = 0;
      }
    }
    this.props.autoPopulate(backgroundVertexNode);
  }

  render() {
    return (
      <div className={styles.panel}>
        <label htmlFor="editmode">Edit Mode </label>
        <input
          type="checkbox"
          name="editmode"
          id="editmode" 
          onChange={this.onEditmode.bind(this)}
        />
        <button onClick={this.handleAutoPopulateButtonClick.bind(this)}>Auto Populate</button>
      </div>
    );
  }
}

export default Panel
