import React, { Component } from 'react';
import styles from './style/app.module.scss';
import Upload from './Upload';
import Board from './Board';
import Panel from './Panel';

class App extends Component {
  resetPicture() {
    this.props.uploadImageHandler(null);
  }

  render() {
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <h1 className={styles.infoText}>Polyshaper</h1>
        </header>
        {
          this.props.uploadedImage
            ? 
            <div>
              <section className={styles.panelSection}>
                <Panel
                  editMode={this.props.editMode}
                  autoPopulate={this.props.autoPopulate}
                  canvasWidth={this.props.canvasWidth}
                  canvasHeight={this.props.canvasHeight}
                  backgroundVertexNode={this.props.backgroundVertexNode}
                  backgroundMaxCols={this.props.backgroundMaxCols}
                  backgroundMaxRows={this.props.backgroundMaxRows}
                  backgroundVariance={this.props.backgroundVariance}
                  backgroundCellSize={this.props.backgroundCellSize}
                  setBackgroundPoly={this.props.setBackgroundPoly}
                  downloadFlattenImage={this.props.downloadFlattenImage}
                  selectedLayer={this.props.selectedLayer}
                  selectedFace={this.props.selectedFace}
                />
              </section>
              <section className={styles.boardSection}>
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
                  backgroundCellSize={this.props.backgroundCellSize}
                  backgroundVariance={this.props.backgroundVariance}
                  vertexSnapGap={this.props.vertexSnapGap}
                  polyEditMode={this.props.polyEditMode}
                  canvasWidth={this.props.canvasWidth}
                  canvasHeight={this.props.canvasHeight}
                  flattenImage={this.props.flattenImage}
                  downloadFlattenImage={this.props.downloadFlattenImage}
                  selectedVertexAdjustPosition={this.props.selectedVertexAdjustPosition}
                  faceSelectHandler={this.props.faceSelectHandler}
                  layerSelectHandler={this.props.layerSelectHandler}
                />
                <button onClick={this.resetPicture.bind(this)} style={{display: 'block', margin: '40px auto'}}>Reset Picture</button>
              </section>
            </div>
            : <Upload uploadImageHandler={this.props.uploadImageHandler} />
        }
      </div>
    );
  }
}

export default App;
