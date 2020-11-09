import React, {Component} from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import './components/yolo.js'
import dog from "./dog.jpg";
import * as ml5 from "ml5";


/*function App() {*/
class App extends Component {
    state = {
        predictions: []
    }
    setPred = (pred) => {
        this.setState({
            predictions: pred
        });
    }
    classifyImg = () => {
        const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

        function modelLoaded() {
            console.log('Model Loaded!');
        }

        const image = document.getElementById('dog-img');

        classifier.predict(image, 5, function (err, results) {
            return results;
        }).then((results) => {
            this.setPred(results)
        })
    }

    componentDidMount(){
        this.classifyImg();
    }

    render() {
        let predictions = (<div className="loader"> </div>);

        if (this.state.predictions.length > 0) {
            predictions = this.state.predictions.map((pred, i) => {
                let { className, probability } = pred;
                probability = Math.floor(probability * 10000) / 100 + "%";
                return (
                    <div key={i + ""}> {i + 1}. Prediction: {className} at {probability} </div>
                )
            })
        }
        return(
        <div className="App">
            <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="https://ml5js.org/"> ML5.js Home </NavbarBrand>
                </div>
            </Navbar>
            <img src={dog} id="dog-img" width="400" alt="" />
            <div> Prediction Results: </div>
                <p> {predictions} </p>
                
        </div>
        );
    }
}

export default App;
