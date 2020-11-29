import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle
} from 'reactstrap';
import * as ml5 from "ml5";
import './ImgClassification.css';

/* This program displays multiple images and their prediction results
 * Media is a container that can hold images and text */

/* Lifecycle methods:
    constructor -> render -> componentDidMount

*/

class ImageClassification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predictions: [],
            selectedImg: null
        };
        this.scroll = this.scroll.bind(this);
    }

    scroll(direction) {
        const imgCon = document.getElementsByClassName('image-container')[0];
        let far = imgCon.width() / 2 * direction;
        let pos = imgCon.scrollLeft() + far;
        imgCon.animate({ scrollLeft: pos }, 1000)
    }

    setPred = (pred, pic) => {
        this.setState({
            predictions: pred,
            selectedImg: pic
        });
    }


    classifyImg = (pic) => {
        const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

        function modelLoaded() {
            console.log('Model Loaded!');
        }
        const image = document.getElementById(pic.id);
        classifier.predict(image, 5, function (err, results) {
            return results;
        }).then((results) => {
            this.setPred(results, pic)
            console.log(results);
        })
    }

    componentDidMount() {
        console.log("ImgClassification component componentDidMount is invoked");
    }

    renderPic(pic) {
        if (pic != null)
            return (
                <div>
                    <img top src={pic.image} alt={pic.name} height="auto" width="100%" />
                    <p>{pic.name}</p>
                    <p>{pic.description}</p>
                </div>
            );
        else
            return (
                <div></div>
            );
    }

    render() {
        const pictures = this.props.pics.map((pic) => {
            return (
                <div className="image">    
                    <Card key={pic.id} onClick={() => this.classifyImg(pic)}>
                        <CardImg width="80%" height="160px" src={pic.image} alt={pic.name} id={ pic.id } />
                        <CardTitle tag="h5" >{pic.name}</CardTitle>
                    </Card>
                </div>
            );    
        });

        let predictions = (<div className="loader"> </div>);
        if (this.state.predictions.length > 0) {
            predictions = this.state.predictions.map((pred, i) => {
                let { className, probability } = pred;
                probability = Math.floor(probability * 10000) / 100 + "%";
                return (
                    <div>                       
                        <div key={i + ""}> { i+1 }. {className} at {probability}</div>
                    </div>
                );

            });
        }

        return (
            <div className="container">
                For more information about ML5.js, click ML5.js Home and learn more!
                <div className="main">
                    <h5> Pick an image from the follwing gallery and check result for your selection. </h5>
                    <div className="wrapper">
                        <div className="image-container">
                            {pictures}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderPic(this.state.selectedImg)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {predictions}
                    </div>
                </div>
            </div>

            
        );
    }
}

export default ImageClassification;