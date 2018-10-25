import React, { Component } from 'react';
import styles from './style/board.module.scss';


class Board extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.colorCanvas = React.createRef();
    this.uploadedImage = React.createRef();
    this.state = {
      vertexId: 0,
      vertices: []
    };
  }

  componentDidUpdate() {
    this.drawPoly();
  }

  handleClick(ev) {
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    this.makeVertex(x, y);
  }

  makeVertex(x, y) {
    const context = this.canvas.current.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, 3, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    let newVertex = {
      x,
      y,
      id: this.state.vertexId,
      next: []
    };
    const vertices = this.state.vertices.slice();

    for (let i = 0; i < vertices.length; i++) {
      vertices[i].next.push(this.state.vertexId);
      newVertex.next.push(vertices[i].id);
    }

    vertices.push(newVertex);
    this.props.makeVertex(newVertex);
    let vertexId = this.state.vertexId + 1;
    if (vertices.length === 3) {
      //여기서 색상을 구해서 넘겨줘야 한다.
      const colorContext = this.colorCanvas.current.getContext('2d');
      colorContext.save(); // trying clear 1
      colorContext.beginPath();
      colorContext.moveTo(vertices[0].x, vertices[0].y); 
      colorContext.lineTo(vertices[1].x, vertices[1].y); 
      colorContext.lineTo(vertices[2].x, vertices[2].y); 
      colorContext.closePath();
      colorContext.clip();
      let image = document.createElement('img');
      image.src = this.props.uploadedImage;
      colorContext.drawImage(image, 0, 0);
      let biggestX = Math.max(vertices[0].x, vertices[1].x, vertices[2].x);
      let biggestY = Math.max(vertices[0].y, vertices[1].y, vertices[2].y);
      let smallestX = Math.min(vertices[0].x, vertices[1].x, vertices[2].x);
      let smallestY = Math.min(vertices[0].y, vertices[1].y, vertices[2].y);
      let colorData = colorContext.getImageData(smallestX, smallestY, biggestX - smallestX, biggestY - smallestY);
      let i = -4;
      let count = 0;
      const rgb = { r: 0, g: 0, b: 0 }
      while ((i += 20) < colorData.data.length) {
        if (colorData.data[i+3] > 200) {
          ++count;
          rgb.r += colorData.data[i];
          rgb.g += colorData.data[i+1];
          rgb.b += colorData.data[i+2];
        }
      }
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);
      console.log(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      this.props.makeFace(vertices, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      colorContext.restore(); // trying clear 1
      context.clearRect(0, 0, this.colorCanvas.current.width, this.colorCanvas.current.height);// trying clear 2
      vertices.length = 0;
    }
    this.setState({
      vertices,
      vertexId
    });
  }

  drawPoly() {
    const context = this.canvas.current.getContext('2d');
    const vertexNode = this.props.vertexNode.slice();
    const faceNode = this.props.faceNode.slice();
    faceNode.map(face => {
      context.beginPath();
      context.moveTo(vertexNode[face.vertices[0]].x, vertexNode[face.vertices[0]].y);
      context.lineTo(vertexNode[face.vertices[1]].x, vertexNode[face.vertices[1]].y);
      context.lineTo(vertexNode[face.vertices[2]].x, vertexNode[face.vertices[2]].y);
      context.closePath();
      context.fillStyle = face.backgroundColor;
      context.fill();
    });
  }

  imageLoad(ev) {
    this.colorCanvas.current.width = this.canvas.current.width = this.uploadedImage.current.width;
    this.colorCanvas.current.height = this.canvas.current.height = this.uploadedImage.current.height;
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
          className={styles.colorCanvas}
          ref={this.colorCanvas}
        />
        <canvas
          className={styles.canvas}
          ref={this.canvas}
        />
      </div>
    );
  }
}

export default Board
