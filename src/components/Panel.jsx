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
      </div>
    );
  }
}

export default Panel
