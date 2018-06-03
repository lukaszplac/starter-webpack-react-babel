import React, { Component } from 'react';
import styles from './App.scss';

class App extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <h1 className={styles.App}>
            This is React boilerplate project. Remove if needed.
        </h1>
        );
    }
}

export default App;