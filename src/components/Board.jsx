import React, { Component } from 'react';
import { debounce } from 'lodash';
import styles from './style/board.module.scss';


class Board extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.colorCanvas = React.createRef();
    this.vertexLayer = React.createRef();
    this.guideLayer = React.createRef();
    this.uploadedImage = React.createRef();
    this.state = {
      vertexId: 0,
      vertices: []
    };
  }

  componentDidUpdate() {
    this.drawPoly();
    if (this.props.polyEditMode) {
      this.vertexLayer.current.width = this.uploadedImage.current.width;
      this.vertexLayer.current.height = this.uploadedImage.current.height;
      this.drawVertex()
    }
  }

  handleClick(ev) {
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const vertexNode = this.props.vertexNode.slice();
    const vertexSnapGap = this.props.vertexSnapGap;
    for (let i = 0; i < vertexNode.length; i++) {
      if ((Math.abs(vertexNode[i].x - x) < vertexSnapGap) && (Math.abs(vertexNode[i].y - y) < vertexSnapGap)) {
        x = vertexNode[i].x;
        y = vertexNode[i].y;
        i = vertexNode.length;
      }
    }
    this.makeVertex(x, y);
  }

  handleMouseMove(ev) {
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const vertexNode = this.props.vertexNode.slice();
    const vertexSnapGap = this.props.vertexSnapGap;
    const context = this.guideLayer.current.getContext('2d');
    if (x < vertexSnapGap) {
      context.clearRect(0, y-3, 6, 6);//test
      context.beginPath();
      context.moveTo(0, y);
      context.arc(0, y, 3, 0, Math.PI * 2);
      context.fillStyle = 'orange';
      context.fill();
    } else {
      context.clearRect(0, y-3, 6, 6);//test
    }
    for (let i = 0; i < vertexNode.length; i++) {
      if ((Math.abs(vertexNode[i].x - x) < vertexSnapGap) && (Math.abs(vertexNode[i].y - y) < vertexSnapGap)) {
        context.beginPath();
        context.moveTo(vertexNode[i].x, vertexNode[i].y);
        context.arc(vertexNode[i].x, vertexNode[i].y, 3, 0, Math.PI * 2);
        context.fillStyle = 'orange';
        context.fill();
        i = vertexNode.length;
      } else {
        context.clearRect(vertexNode[i].x-3, vertexNode[i].y-3, 6, 6);
      }
    }
  }

  makeVertex(x, y) {
    if (this.props.polyEditMode) {
      return;
    }
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
      if (vertices[i].x === x && vertices[i].y === y) {
        return;
      }
    }

    for (let i = 0; i < vertices.length; i++) {
      vertices[i].next.push(this.state.vertexId);
      newVertex.next.push(vertices[i].id);
    }

    vertices.push(newVertex);
    this.props.makeVertex(newVertex);
    let vertexId = this.state.vertexId + 1;
    if (vertices.length === 3) {
      const colorContext = this.colorCanvas.current.getContext('2d');
      colorContext.save();
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
        if (colorData.data[i + 3] > 200) {
          ++count;
          rgb.r += colorData.data[i];
          rgb.g += colorData.data[i + 1];
          rgb.b += colorData.data[i + 2];
        }
      }
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);
      this.props.makeFace(vertices, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      colorContext.restore();
      context.clearRect(0, 0, this.colorCanvas.current.width, this.colorCanvas.current.height);// It make red spot clear
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

  drawVertex() {
    console.log('draw');

    const context = this.vertexLayer.current.getContext('2d');
    const vertexNode = this.props.vertexNode.slice();
    vertexNode.map(vertex => {
      context.beginPath();
      context.moveTo(vertex.x, vertex.y);
      context.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
      context.fillStyle = 'red';
      context.fill();
    });
  }

  imageLoad(ev) {
    console.log(this.vertexLayer.current);
    this.guideLayer.current.width = this.colorCanvas.current.width = this.canvas.current.width = this.uploadedImage.current.width;
    this.guideLayer.current.height = this.colorCanvas.current.height = this.canvas.current.height = this.uploadedImage.current.height;
  }

  render() {
    return (
      <div className={styles.board} onClick={this.handleClick.bind(this)} onMouseMove={this.handleMouseMove.bind(this)}>
        <img
          src={this.props.uploadedImage}
          ref={this.uploadedImage}
          alt="user uploaded"
          className={styles.uploaded_image}
          onLoad={this.imageLoad.bind(this)}
        />

        <canvas
          className={styles.guideLayer}
          ref={this.guideLayer}
        />

        <canvas
          className={styles.colorCanvas}
          ref={this.colorCanvas}
        />

        {
          this.props.polyEditMode
          ? <canvas
            className={styles.vertexLayer}
            ref={this.vertexLayer}
            onLoad={this.drawVertex.bind(this)}
          />
          : null
        }
        
        <canvas
          className={styles.canvas}
          ref={this.canvas}
        />
      </div>
    );
  }
}

export default Board
