import React, { Component } from 'react';
import { Media } from 'reactstrap';
import person from "../assets/person.jpg";
import kite from "../assets/kite.jpg";
import giraffe from "../assets/giraffe.jpg";
import * as ml5 from "ml5";

/* This program displays multiple images and their prediction results
 * Media is a container that can hold images and text */

class ImageClassification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pics: [
                {
                    id: 'kite-img',
                    image: kite,
                    name: 'Kite',
                    description: 'Ocean, Kite and people',
                },
                {
                    id: 'person-img',
                    image: person,
                    name: 'Person',
                    description: 'Person, a horse and a dog',
                },
                {
                    id: 'giraffe-img',
                    image: giraffe,
                    name: 'Giraffe',
                    description: 'A giraffe and an zebra',
                }
            ],
            predictions: []
        };
    }

    setPred = (pred) => {
        this.setState({
            predictions: this.state.predictions.concat(pred)
            /*predictions: pred*/
        });
    }

    classifyImg = () => {
        const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

        function modelLoaded() {
            console.log('Model Loaded!');
        }

        for (var i = 0; i < this.state.pics.length; i++) {
            const image = document.getElementById(this.state.pics[i].id);
            classifier.predict(image, 5, function (err, results) {
                return results;
            }).then((results) => {
                this.setPred(results)
                console.log(results);
            })
        }
    }

    componentDidMount() {
        this.classifyImg();
    }

    render() {
        const pictures = this.state.pics.map((pic) => {
            let predictions = (<div className="loader"> </div>);
            return (
                <div key={pic.id} className="col-12 mt-5">
                        <Media tag="li">
                            <Media left middle>
                                <Media object src={pic.image} alt={pic.name} id={ pic.id } width="500" />
                            </Media>
                            <Media body className="ml-5">
                                <Media heading> {pic.name} </Media>
                                <p> {pic.description} </p>
                            </Media>
                        </Media>
                    
                </div>
            );    
        });

        let predictions = (<div className="loader"> </div>);
        if (this.state.predictions.length > 0) {
            predictions = this.state.predictions.map((pred, i) => {
                let { className, probability } = pred;
                probability = Math.floor(probability * 10000) / 100 + "%";
                var temp = i - Math.floor(i/5) * 5 + 1;
                if (i == 0 || i == 5 || i == 10) {
                    return (
                        <div>
                            <div>
                                <p> <br /> </p>
                                Image {Math.floor(i / 4) + 1}
                            </div>
                            <div key={i + ""}> {temp}. Prediction: {className} at {probability}</div>                            
                        </div>

                    )
                }
                else {
                    return (
                        <div key={i + ""}> {temp}. Prediction: {className} at {probability}
                        </div>
                    )
                }
            })
        }

        return (

            <div className="row">
                <Media list>
                    {pictures}
                </Media>
                <Media list>
                    <Media tag="li">
                        <Media body className="ml-5">
                            <Media heading> Prediction Results: </Media>
                            <p> {predictions} </p>
                        </Media>
                    </Media>
                </Media>
            </div>

            
        );
    }
}

export default ImageClassification;