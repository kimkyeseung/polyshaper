import React, { Component } from 'react';
import { debounce } from 'lodash';
import styles from './style/panel.module.scss';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.handleAutoPopulateValueChange = debounce(this.handleAutoPopulateValueChange.bind(this), 500, {
      leading: false,
      trailing: true
    });
  }

  onEditmode(ev) {
    if (ev.target.checked) {
      this.props.editMode(true);
    } else {
      this.props.editMode(false);
    }
  }

  handleAutoPopulateValueChange(data, category) {
    this.props.setBackgroundPoly(data, category);
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
      vertex.x = vertex.x + (Math.random() - 0.5) * this.props.backgroundVariance * this.props.backgroundCellSize * 2;
      console.log(this.props.backgroundVariance);
      vertex.y = (row * this.props.backgroundCellSize * 0.865) - this.props.backgroundCellSize;
      vertex.y = vertex.y + (Math.random() - 0.5) * this.props.backgroundVariance * this.props.backgroundCellSize * 2;
      // console.log(vertex.y);
      vertex.col = col;
      vertex.row = row;
      backgroundVertexNode.push(vertex);
      col++;
      if ((i + 1) % maxCols === 0) {
        row++;
        col = 0;
      }
    }
    this.props.autoPopulate(backgroundVertexNode);
  }

  render() {
    return (
      <div className={styles.panel}>
        <fieldset className={styles.editmode}>
          <label htmlFor="editmode">Edit Mode </label>
          <input
            type="checkbox"
            name="editmode"
            id="editmode"
            onChange={this.onEditmode.bind(this)}
          />
        </fieldset>

        <fieldset>
          <legend>Auto Populate Settings</legend>
          <label htmlFor="variance">Variance</label>
          <input
            type="range"
            id="variance"
            name="variance"
            defaultValue={this.props.backgroundVariance}
            step="0.01"
            min="0"
            max="1"
            onChange={(ev) => this.handleAutoPopulateValueChange(ev.target.value, 'variance')}
          />

          <label htmlFor="cellsize">Cellsize</label>
          <input
            type="range"
            id="cellsize"
            name="cellsize"
            min="24"
            max="200"
            defaultValue={this.props.backgroundCellSize}
            step="2"
            onChange={(ev) => this.handleAutoPopulateValueChange(ev.target.value, 'cellsize')}
          />
          <button onClick={this.handleAutoPopulateButtonClick.bind(this)}>Auto Populate</button>

        </fieldset>
      </div>
    );
  }
}

export default Panel
