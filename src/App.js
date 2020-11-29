import React, {Component} from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import './components/yolo.js';
import { IMAGES } from './shared/imgInfo';
import ImageClassification from './components/ImgClassification';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';

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
            <Header />
                <ImageClassification pics={this.state.pics} />
            <Footer />
        </div>
        );
    }
}

export default App;
