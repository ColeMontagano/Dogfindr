import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import "../../src/App.css"



class Home extends Component {

    state = {
        loading: true,
        lostDogs: {}
    }

    componentDidMount() {
        axios.get("http://localhost:8080/lostdogs")
            .then(({ data }) => {
                this.setState({
                    lostDogs: data,
                    loading: false
                })
            })
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <div id="headerText">
                        <h1>Dog Findr</h1>
                        <p>Losing your dog is stressful. Register your better half with DogFindr and rest easier knowing that whoever finds your pup can reunite you both quickly & safely.</p>
                    </div>
                </div>
                <h2> Missing Dogs </h2>
                <ul className="dogList">
                    <MissingDogs loading={this.state.loading} lostDogs={this.state.lostDogs} />
                </ul>
            </div >
        )
    }
}

const MissingDogs = (props) => {
    return (
        !props.loading && props.lostDogs.map((dog, i) => {
            return (
                <div key={i} style={{ display: 'inline-block' }}>
                    <DogCard dog={dog} />
                </div>
            )
        })
    )
}



const DogCard = (props) => {
    const imageB64 = "base64," + props.dog.image.data
    return (
        <Link to={`/mydog/${props.dog._id}`}>
            <div className="card">
                <img className="card-img-top" src={"data:image/jpeg;" + imageB64} alt="Dog" />
                <div className="card-body">
                    <h5 className="card-title">{props.dog.name}</h5>
                    <p className="card-text">Location : {props.dog.locationArea}</p>
                </div>
            </div>
        </Link>

    )
}

export default Home