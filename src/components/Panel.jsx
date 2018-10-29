import React, { Component } from 'react';
import { debounce } from 'lodash';
import styles from './style/panel.module.scss';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.setWidth = React.createRef();
    this.handleAutoPopulateValueChange = debounce(this.handleAutoPopulateValueChange.bind(this), 500, {
      leading: false,
      trailing: true
    });
    this.handleSizeChange = debounce(this.handleSizeChange.bind(this), 500);
  }

  componentDidUpdate() {
    this.setWidth.current.value = this.props.canvasWidth;
  }

  handleSizeChange(size) {
    console.log(size);
  }

  handlieImageDownloadClick() {
    this.props.downloadFlattenImage(true);
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
    this.props.autoPopulate();
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

        <fieldset className={styles.size}>
          <legend>Image Size Setting</legend>
          <label htmlFor="">Width : </label>
          <input type="text" name="setWidth" id="setWidth" ref={this.setWidth} onChange={(ev) => {
            this.handleSizeChange(ev.target.value);
          }}/>
          <p>height : {this.props.canvasHeight}</p>
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
            onChange={(ev) => {
              this.handleAutoPopulateValueChange(ev.target.value, 'variance');
            }}
          />

          <label htmlFor="cellsize">Cellsize</label>
          <input
            type="range"
            id="cellsize"
            name="cellsize"
            min="6"
            max="200"
            defaultValue={this.props.backgroundCellSize}
            step="2"
            onChange={(ev) => {
              this.handleAutoPopulateValueChange(ev.target.value, 'cellsize');
            }}
          />
          <button onClick={this.handleAutoPopulateButtonClick.bind(this)}>Auto Populate</button>

        </fieldset>

        <button onClick={this.handlieImageDownloadClick.bind(this)}>Download Image</button>
      </div>
    );
  }
}

export default Panel
