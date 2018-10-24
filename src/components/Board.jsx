import React, { Component } from 'react';
import styles from './style/board.module.scss';



class Board extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.uploadedImage = React.createRef();
  }

  handleClick(ev) {
    console.log(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY);
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    this.props.makeVertex(x, y);
  }
  
  componentDidUpdate() {
    this.drawPoly();
  }

  drawPoly() {
    const context = this.canvas.current && this.canvas.current.getContext('2d');
    const dotNode = this.props.dotNode.slice();
    for (let i = 0; i < dotNode.length; i++) {
      context.beginPath();
      context.moveTo(dotNode[i].x, dotNode[i].y);
      context.arc(dotNode[i].x, dotNode[i].y, 3, 0, Math.PI * 2);
      context.fillStyle = 'red';
      context.fill();
    }
  }

  imageLoad(ev) {
    this.canvas.current.width = this.uploadedImage.current.width;
    this.canvas.current.height = this.uploadedImage.current.height;
  }

  render() {
    return (
      <div className={styles.board} onClick={this.handleClick.bind(this)}>
        <img
          src={this.props.uploadedImage}
          ref={this.uploadedImage}
          alt="user uploaded"
          className={styles.uploaded_image}
          onLoad={this.imageLoad.bind(this)}
        />
        <canvas
          className={styles.canvas}
          ref={this.canvas}
        /> 
      </div>
    );
  }
};

export default Board
