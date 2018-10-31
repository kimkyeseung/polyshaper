import React, { Component } from 'react';
import styles from './style/board.module.scss';

class Board extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.colorCanvas = React.createRef();
    this.editModeVertexLayer = React.createRef();
    this.snapGuideLayer = React.createRef();
    this.uploadedImage = React.createRef();
    this.backgroundLayer = React.createRef();
    this.flatten = React.createRef();
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
      this.drawVertex();
    }
    if (this.props.backgroundVertexNode.length) {
      const backgroundVertexNode = this.props.backgroundVertexNode.slice();
      this.drawBackground(backgroundVertexNode);
    }
    if (this.props.flattenImage) {
      this.flattenImage();
    }
  }

  handleMouseDown(ev) {
    console.log('ev mousedown');
    this.setState({
      isMousedown: true
    });
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const context = this.snapGuideLayer.current.getContext('2d');
    if (this.props.polyEditMode) {

    } else {
      context.beginPath();
      context.clearRect(x - 3, y - 3, 6, 6);
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fillStyle = 'orange';
      context.fill();
    }

  }

  handleMouseUp(ev) {
    console.log('ev mouseup');
    this.setState({
      isMousedown: false
    });
    if (this.props.polyEditMode) {
      // this.drawVertex();
    } else {
      this.addVertex(ev);
    }
  }

  addVertex(ev) {
    console.log('add vertex');
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const vertexNode = this.props.vertexNode.slice();
    const vertexSnapGap = this.props.vertexSnapGap;

    if (x < vertexSnapGap || x > this.snapGuideLayer.current.width - vertexSnapGap || y < vertexSnapGap || y > this.snapGuideLayer.current.height - vertexSnapGap) {
      if (x < vertexSnapGap) {
        x = 0;
      }
      if (y < vertexSnapGap) {
        y = 0;
      }
      if (x > this.snapGuideLayer.current.width - vertexSnapGap) {
        x = this.snapGuideLayer.current.width;
      }
      if (y > this.snapGuideLayer.current.height - vertexSnapGap) {
        y = this.snapGuideLayer.current.height;
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

  handleMouseMove(ev) {
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    const vertexNode = this.props.vertexNode.slice();
    const vertexSnapGap = this.props.vertexSnapGap;
    const snapGuideContext = this.snapGuideLayer.current.getContext('2d'); // vv this is for the snap
    if (x < vertexSnapGap || x > this.snapGuideLayer.current.width - vertexSnapGap || y < vertexSnapGap || y > this.snapGuideLayer.current.height - vertexSnapGap) {
      if (x < vertexSnapGap) {
        x = 0;
      }
      if (y < vertexSnapGap) {
        y = 0;
      }
      if (x > this.snapGuideLayer.current.width - vertexSnapGap) {
        x = this.snapGuideLayer.current.width;
      }
      if (y > this.snapGuideLayer.current.height - vertexSnapGap) {
        y = this.snapGuideLayer.current.height;
      }
      snapGuideContext.beginPath();
      snapGuideContext.clearRect(0, 0, this.snapGuideLayer.current.width, this.snapGuideLayer.current.height);//this clear all
      snapGuideContext.arc(x, y, 3, 0, Math.PI * 2);
      snapGuideContext.fillStyle = 'orange';
      snapGuideContext.fill();
    } else {
      snapGuideContext.clearRect(0, 0, this.snapGuideLayer.current.width, this.snapGuideLayer.current.height);
    }
    for (let i = 0; i < vertexNode.length; i++) {
      if ((Math.abs(vertexNode[i].x - x) < vertexSnapGap) && (Math.abs(vertexNode[i].y - y) < vertexSnapGap)) {
        snapGuideContext.beginPath();
        snapGuideContext.clearRect(0, 0, this.snapGuideLayer.current.width, this.snapGuideLayer.current.height);
        snapGuideContext.arc(vertexNode[i].x, vertexNode[i].y, 3, 0, Math.PI * 2);
        snapGuideContext.fillStyle = 'orange';
        snapGuideContext.fill();
        i = vertexNode.length;
      } else {
        snapGuideContext.clearRect(vertexNode[i].x - 3, vertexNode[i].y - 3, 6, 6);
      }
    }

    if (this.state.isMousedown) {// when move wht mouse down
      if (this.props.polyEditMode) {
        for (let i = 0; i < vertexNode.length; i++) {
          if ((Math.abs(vertexNode[i].x - x) < vertexSnapGap) && (Math.abs(vertexNode[i].y - y) < vertexSnapGap)) {
            vertexNode[i].x = x;
            vertexNode[i].y = y;
            this.drawPoly();
          }
        }
      } else {
        const context = this.canvas.current.getContext('2d');//fixed
        const vertices = this.state.vertices.slice();
        context.beginPath();
        context.clearRect(x - 3, y - 3, 6, 6);
        context.arc(x, y, 3, 0, Math.PI * 2);
        context.fillStyle = 'orange';
        context.fill();
        for (let i = 0; i < vertices.length; i++) {
          context.clearRect(vertices[i].x - 3, vertices[i].y - 3, 6, 6);
          context.arc(x, y, 3, 0, Math.PI * 2);
          context.fillStyle = 'orange';
          context.fill();
        }
      }
    }
  }

  makeVertex(x, y) {
    if (this.props.polyEditMode) {
      return;
    }
    const context = this.canvas.current.getContext('2d');
    console.log('ev makevertex', x, y);
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
      const colorData = this.getColorAverage(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y);
      this.props.makeFace(vertices, `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`);
      context.clearRect(0, 0, this.colorCanvas.current.width, this.colorCanvas.current.height);
      vertices.length = 0;
    }
    this.setState({
      vertices,
      vertexId
    });
  }

  getColorAverage(x1, y1, x2, y2, x3, y3) {//return object : {r: 00, g:00, b: 00};
    const colorContext = this.colorCanvas.current.getContext('2d');
    colorContext.save();
    colorContext.beginPath();
    colorContext.moveTo(x1, y1);
    colorContext.lineTo(x2, y2);
    colorContext.lineTo(x3, y3);
    colorContext.closePath();
    colorContext.clip();
    let image = document.createElement('img');
    image.src = this.props.uploadedImage;
    colorContext.drawImage(image, 0, 0);
    let biggestX = Math.max(x1, x2, x3);
    let biggestY = Math.max(y1, y2, y3);
    let smallestX = Math.min(x1, x2, x3);
    let smallestY = Math.min(y1, y2, y3);
    let colorData = colorContext.getImageData(smallestX, smallestY, Math.ceil(biggestX - smallestX) || 1, Math.ceil(biggestY - smallestY) || 1);
    let count = 0;
    const rgb = { r: 0, g: 0, b: 0 };
    for (let i = -4; i < colorData.data.length; i += 20) {
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
    colorContext.restore();
    return rgb;
  }

  drawPoly() {//draw colored poly when component updated
    console.log('drawpoly when component updated');
    const context = this.canvas.current.getContext('2d');
    const vertexNode = this.props.vertexNode.slice();
    const faceNode = this.props.faceNode.slice();
    // context.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
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

  drawVertex() { //draw vertices when editmode
    const context = this.editModeVertexLayer.current.getContext('2d');
    const vertexNode = this.props.vertexNode.slice();
    vertexNode.forEach(vertex => {
      context.beginPath();
      context.moveTo(vertex.x, vertex.y);
      context.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
      context.fillStyle = 'red';
      context.fill();
    });
  }

  drawBackground(vertices) {
    const context = this.backgroundLayer.current.getContext('2d');
    let maxCols = this.props.backgroundMaxCols;
    let colorData;
    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i].row % 2 === 0 && vertices[i + maxCols + 1] && vertices[i].col < maxCols - 1) {
        context.beginPath();
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i + maxCols].x, vertices[i + maxCols].y);
        context.lineTo(vertices[i + maxCols + 1].x, vertices[i + maxCols + 1].y);
        context.closePath();
        colorData = this.getColorAverage(vertices[i].x, vertices[i].y, vertices[i + maxCols].x, vertices[i + maxCols].y, vertices[i + maxCols + 1].x, vertices[i + maxCols + 1].y);
        context.fillStyle = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
        context.fill();

        context.beginPath();
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i + 1].x, vertices[i + 1].y);
        context.lineTo(vertices[i + maxCols + 1].x, vertices[i + maxCols + 1].y);
        context.closePath();
        colorData = this.getColorAverage(vertices[i].x, vertices[i].y, vertices[i + 1].x, vertices[i + 1].y, vertices[i + maxCols + 1].x, vertices[i + maxCols + 1].y);
        context.fillStyle = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
        context.fill();

      } else if (vertices[i - 1] && vertices[i + maxCols] && vertices[i].col > 0) {
        context.beginPath();
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i - 1].x, vertices[i - 1].y);
        context.lineTo(vertices[i + maxCols - 1].x, vertices[i + maxCols - 1].y);
        context.closePath();
        colorData = this.getColorAverage(vertices[i].x, vertices[i].y, vertices[i - 1].x, vertices[i - 1].y, vertices[i + maxCols - 1].x, vertices[i + maxCols - 1].y);
        context.fillStyle = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
        context.fill();

        context.beginPath();
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i + maxCols].x, vertices[i + maxCols].y);
        context.lineTo(vertices[i + maxCols - 1].x, vertices[i + maxCols - 1].y);
        context.closePath();
        colorData = this.getColorAverage(vertices[i].x, vertices[i].y, vertices[i + maxCols].x, vertices[i + maxCols].y, vertices[i + maxCols - 1].x, vertices[i + maxCols - 1].y);
        context.fillStyle = `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`;
        context.fill();
      }
    }
  }

  imageLoad(ev) {
    this.props.setUpCanvasSize(this.uploadedImage.current.width, this.uploadedImage.current.height);
  }

  flattenImage() {
    const context = this.flatten.current.getContext('2d');
    context.drawImage(this.backgroundLayer.current, 0 ,0, this.props.canvasWidth, this.props.canvasHeight);
    context.drawImage(this.canvas.current, 0 ,0, this.props.canvasWidth, this.props.canvasHeight);

    let dataURL = this.flatten.current.toDataURL("image/png");
    this.props.downloadFlattenImage(false);
    let link = document.createElement('a');
    link.download = 'yourPoly.png';
    link.href = dataURL;
    link.click();
  }

  render() {
    return (
      <div
        className={styles.board}
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

        <canvas //this is only for snap
          className={styles.snapGuideLayer}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.snapGuideLayer}
        />

        <canvas
          className={styles.colorCanvas}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.colorCanvas}
        />

        {
          this.props.polyEditMode
            ? <canvas
              className={styles.editModeVertexLayer}
              width={this.props.canvasWidth}
              height={this.props.canvasHeight}
              ref={this.editModeVertexLayer}
              onLoad={this.drawVertex.bind(this)}
            />
            : null
        }

        <canvas
          className={styles.canvas}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.canvas}
        />

        <canvas
          className={styles.backgroundLayer}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.backgroundLayer}
        />

        <canvas
          className={styles.flatten}
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={this.flatten}
        />
      </div>
    );
  }
}

export default Board
