import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle
} from 'reactstrap';
import * as ml5 from "ml5";

/* This program displays multiple images and their prediction results
 * Media is a container that can hold images and text */

class ImageClassification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predictions: [],
            selectedImg: null
        }
    }

    setPred = (pred) => {
        this.setState({
            predictions: pred
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
            this.setPred(results)
            console.log(results);
        })

        if (pic != null) {
            return (
                <Card>
                    <CardImg top src={pic.image} alt={pic.name} />
                    <CardBody>
                        <CardTitle>{pic.name}</CardTitle>
                        <CardText>{pic.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return (
                <div></div>
            );
        }

    }

/*    componentDidMount(pic) {
        this.classifyImg(pic);
    }
*/

    render() {
        const pictures = this.props.pics.map((pic) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={pic.id} onClick={() => this.classifyImg(pic)}>
                        <CardImg width="50%" src={pic.image} alt={pic.name} id={ pic.id } />
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
                        <div key={i + ""}> { i+1 }. Prediction: {className} at {probability}</div>
                    </div>
                );

            });
        }

        return (
            <div className="row">
                {pictures}

                <div> Prediction Results of Selected Image: </div>
                <p>
                    <br/>
                    {predictions}
                </p>
            </div>

            
        );
    }
}

export default ImageClassification;