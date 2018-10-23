import React, { Component } from 'react';
import styles from './style/app.module.scss';
import Upload from './Upload';

class App extends Component {

  render() {
    return (
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <h1 className={styles['info-text']}>Polyshaper</h1>
        </header>
        <div>
          {
            this.props.uploadedImage 
            ? <img src={this.props.uploadedImage} alt='user uploaded' /> 
            : <Upload uploadImageHandler={this.props.uploadImageHandler}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
