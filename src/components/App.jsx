import React, { Component } from 'react';
import styles from './style/app.module.scss';
import Upload from './Upload';
import Board from './Board';
import Panel from './Panel';

class App extends Component {

  render() {
    return (
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <h1 className={styles['info-text']}>Polyshaper</h1>
        </header>
        {
          this.props.uploadedImage
            ? 
            <div>
              <Panel
                editMode={this.props.editMode}
                autoPopulate={this.props.autoPopulate}
                canvasWidth={this.props.canvasWidth}
                canvasHeight={this.props.canvasHeight}
                backgroundVertexNode={this.props.backgroundVertexNode}
                backgroundMaxCols={this.props.backgroundMaxCols}
                backgroundVariance={this.props.backgroundVariance}
                backgroundMaxRows={this.props.backgroundMaxRows}
                backgroundCellSize={this.props.backgroundCellSize}
                />
              <Board
                uploadedImage={this.props.uploadedImage}
                setUpCanvasSize={this.props.setUpCanvasSize}
                makeFace={this.props.makeFace}
                makeVertex={this.props.makeVertex}
                faceNode={this.props.faceNode}
                vertexNode={this.props.vertexNode}
                backgroundVertexNode={this.props.backgroundVertexNode}
                backgroundMaxCols={this.props.backgroundMaxCols}
                backgroundMaxRows={this.props.backgroundMaxRows}
                canvas={this.props.canvas}
                vertexSnapGap={this.props.vertexSnapGap}
                polyEditMode={this.props.polyEditMode}
                canvasWidth={this.props.canvasWidth}
                canvasHeight={this.props.canvasHeight}
              />
            </div>
            : <Upload uploadImageHandler={this.props.uploadImageHandler} />
        }
      </div>
    );
  }
}

export default App;
