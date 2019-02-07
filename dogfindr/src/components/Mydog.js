import React, { Component } from "react"
import axios from "axios";
import Mapbox from "./Mapbox"

class Mydog extends Component {

    state = {
        dog: {},
        dogimage: null,
        loading: true,
        lost: null

    }

    componentWillMount() {
        let dog = this.props.renderProps.match.params.id
        axios.get(`http://localhost:8080/mydog/${dog}`)
            .then(({ data }) => {
                this.setState({
                    dog: data[0],
                    dogimage: data[0].image.data,
                    loading: false,
                    lost: data[0].lost
                })
            })

    }



    updateLocation = (lng, lat) => {
        this.setState({
            dog: {
                ...this.state.dog,
                location: {
                    lng: lng,
                    lat: lat
                }
            }
        })
    }

    updateMissing = () => {
        let dog = this.props.renderProps.match.params.id
        axios.put(`http://localhost:8080/mydog/${dog}/missing`, {
            lost: !this.state.dog.lost
        }).then(res => {
            this.setState({
                lost: !this.state.lost
            })
        })
    }

    saveLocation = () => {
        let dog = this.props.renderProps.match.params.id
        axios.put(`http://localhost:8080/mydog/${dog}/updatelocation`, {
            location: {
                lat: this.state.dog.location.lat,
                lng: this.state.dog.location.lng
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.renderProps.match.params.id !== this.props.renderProps.match.params.id) {
            let dog = this.props.renderProps.match.params.id
            axios.get(`http://localhost:8080/mydog/${dog}`)
                .then(({ data }) => {
                    this.setState({
                        dog: data[0],
                        dogimage: data[0].image.data,
                        loading: false,
                        lost: data[0].lost
                    })
                })

        }
    }



    render() {
        const imageB64 = "base64," + this.state.dogimage
        return (
            <div className="container">
                {
                    !this.state.loading &&
                    <div>
                        <div className="descriptionbox">
                            <img id="Dogimage" src={"data:image/jpeg;" + imageB64} alt="dog" />
                            <h1>{this.state.dog.name}</h1>


                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <h4>Owner</h4>
                                    <p>{this.state.dog.owner}</p>
                                    <h4>Contact</h4>
                                    <p>{this.state.dog.email} </p>
                                    <h4>Location</h4>
                                    <p>{this.state.dog.locationArea}</p>
                                </div>
                                <div className="col-12 col-md-6">
                                    <h4>Description</h4>
                                    <p>{this.state.dog.description}</p>
                                </div>
                            </div>


                        </div>


                        {this.state.lost && <h4>Help Me Find {this.state.dog.name}</h4>}
                        {this.state.dog.user === localStorage.getItem("userId") &&
                            <div>
                                <button className="btn btn-outline-info" onClick={this.updateMissing}>{this.state.lost ? <div>Safe!</div> : <div>Missing!</div>}</button>
                            </div>
                        }

                        {this.state.lost &&
                            <div>
                                <h4>Last Known Location: </h4>
                                {this.state.dog.user === localStorage.getItem("userId") &&
                                    <button className="btn btn-outline-info" onClick={this.saveLocation}>Save Location</button>
                                }
                                <div className="Map">
                                    <Mapbox location={this.state.dog.locationArea} dog={this.state.dog} updateLocation={this.updateLocation} />
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>


        )
    }

}

export default Mydog