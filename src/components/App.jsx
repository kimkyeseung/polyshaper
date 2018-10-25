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
              <Panel editMode={this.props.editMode}/>
              <Board
                uploadedImage={this.props.uploadedImage}
                makeFace={this.props.makeFace}
                makeVertex={this.props.makeVertex}
                faceNode={this.props.faceNode}
                vertexNode={this.props.vertexNode}
                canvas={this.props.canvas}
                vertexSnapGap={this.props.vertexSnapGap}
                polyEditMode={this.props.polyEditMode}
              />
            </div>
            : <Upload uploadImageHandler={this.props.uploadImageHandler} />
        }
      </div>
    );
  }
}

export default App;
