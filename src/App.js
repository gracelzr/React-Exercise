import React, {Component} from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import './components/yolo.js';
import { IMAGES } from './shared/imgInfo';
import ImageClassification from './components/ImgClassification';


/*function App() {*/
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pics: IMAGES
        };
    }

    render() {
        return(
        <div className="App">
            <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="https://ml5js.org/"> ML5.js Home </NavbarBrand>
                </div>
                </Navbar>
                <ImageClassification pics={this.state.pics} />
        </div>
        );
    }
}

export default App;
