import React, {Component} from 'react';
import './App.css';
import {TitlePanel} from "./components/TitlePanel/TitlePanel";
import MainPanel from "./components/MainPanel/MainPanel";

class App extends Component {
    render() {
        return (
            <div className="App">
                <TitlePanel/>
                <MainPanel/>
            </div>
        );
    }
}

export default App;
