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
      vertices: [],
      isMousedown: false
    };
    this.shortcut = this.shortcut.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.shortcut);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.shortcut);
  }

  shortcut(ev) {
    console.log(ev.keyCode);
  }

  componentDidUpdate() {
    this.drawPoly();
    if (this.props.polyEditMode) {
      this.vertexLayer.current.width = this.uploadedImage.current.width;
      this.vertexLayer.current.height = this.uploadedImage.current.height;
      this.drawVertex()
    }
  }

  // handleClick(ev) {
  //   if (this.props.polyEditMode) {
  //     console.log('click on editmode');
  //     return;
  //   } else {
  //     this.addVertex(ev);
  //   }
  // }

  handleMouseDown(ev) {//this is only add mode now, distinguish add mode and edit mode
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const context = this.guideLayer.current.getContext('2d');
    context.beginPath();
    context.clearRect(x-3, y-3, 6, 6);
    context.arc(x, y, 3, 0, Math.PI * 2);
    context.fillStyle = 'orange';
    context.fill();

    this.setState({
      isMousedown: true
    });
  }

  handleMouseUp(ev) {
    this.addVertex(ev);
    this.setState({
      isMousedown: false
    });
  }

  addVertex(ev) {
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const vertexNode = this.props.vertexNode.slice();
    const vertexSnapGap = this.props.vertexSnapGap;

    if (x < vertexSnapGap || x > this.guideLayer.current.width - vertexSnapGap || y < vertexSnapGap || y > this.guideLayer.current.height - vertexSnapGap) {
      if (x < vertexSnapGap) {
        x = 0;
      }
      if (y < vertexSnapGap) {
        y = 0;
      }
      if (x > this.guideLayer.current.width - vertexSnapGap) {
        x = this.guideLayer.current.width;
      }
      if (y > this.guideLayer.current.height - vertexSnapGap) {
        y = this.guideLayer.current.height;
      }
    } else {
      x = ev.nativeEvent.offsetX;
      y = ev.nativeEvent.offsetY;
    }
    for (let i = 0; i < vertexNode.length; i++) {
      if ((Math.abs(vertexNode[i].x - x) < vertexSnapGap) && (Math.abs(vertexNode[i].y - y) < vertexSnapGap)) {
        x = vertexNode[i].x;
        y = vertexNode[i].y;
        i = vertexNode.length;
      }
    }
    this.makeVertex(x, y);
  }

  // editVertex(ev) {//mouse down
  //   let x = ev.nativeEvent.offsetX;
  //   let y = ev.nativeEvent.offsetY;
  //   const vertexNode = this.props.vertexNode.slice();
  //   for (let i = 0; i < vertexNode.length; i++) {
  //     if (vertexNode[i].x === x && vertexNode[i].y === y) {
  //       console.log('finded');
  //     }
  //   }
  // }

  handleMouseMove(ev) {
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const vertexNode = this.props.vertexNode.slice();
    const vertexSnapGap = this.props.vertexSnapGap;
    const context = this.guideLayer.current.getContext('2d');
    if (x < vertexSnapGap || x > this.guideLayer.current.width - vertexSnapGap || y < vertexSnapGap || y > this.guideLayer.current.height - vertexSnapGap) {
      if (x < vertexSnapGap) {
        x = 0;
      }
      if (y < vertexSnapGap) {
        y = 0;
      }
      if (x > this.guideLayer.current.width - vertexSnapGap) {
        x = this.guideLayer.current.width;
      }
      if (y > this.guideLayer.current.height - vertexSnapGap) {
        y = this.guideLayer.current.height;
      }
      context.beginPath();
      context.clearRect(0, 0, this.guideLayer.current.width, this.guideLayer.current.height);
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fillStyle = 'orange';
      context.fill();
    } else {
      let x = ev.nativeEvent.offsetX;
      let y = ev.nativeEvent.offsetY;
      context.clearRect(0, 0, this.guideLayer.current.width, this.guideLayer.current.height);
    }
    for (let i = 0; i < vertexNode.length; i++) {
      if ((Math.abs(vertexNode[i].x - x) < vertexSnapGap) && (Math.abs(vertexNode[i].y - y) < vertexSnapGap)) {
        context.beginPath();
        context.clearRect(0, 0, this.guideLayer.current.width, this.guideLayer.current.height);
        context.arc(vertexNode[i].x, vertexNode[i].y, 3, 0, Math.PI * 2);
        context.fillStyle = 'orange';
        context.fill();
        i = vertexNode.length;
      } else {
        context.clearRect(vertexNode[i].x-3, vertexNode[i].y-3, 6, 6);
      }
    }

    if (this.state.isMousedown) {
      const context = this.guideLayer.current.getContext('2d');
      const vertices = this.state.vertices.slice();
      context.beginPath();
      context.clearRect(x-3, y-3, 6, 6);
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fillStyle = 'orange';
      context.fill();
      for (let i = 0; i < vertices.length; i++) {
        context.clearRect(vertices[i].x-3, vertices[i].y-3, 6, 6);
        context.arc(x, y, 3, 0, Math.PI * 2);
        context.fillStyle = 'orange';
        context.fill();
      }
    }
  }

  makeVertex(x, y) {
    if (this.props.polyEditMode) {
      return;
    }
    const context = this.canvas.current.getContext('2d');
    context.beginPath();
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
      const rgb = { r: 0, g: 0, b: 0 };
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
      context.clearRect(0, 0, this.colorCanvas.current.width, this.colorCanvas.current.height);
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
    faceNode.forEach(face => {
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
    vertexNode.forEach(vertex => {
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
      <div
        className={styles.board}
        // onClick={this.handleClick.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
      >
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
