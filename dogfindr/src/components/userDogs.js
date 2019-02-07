import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from "axios";


class Userdogs extends Component {
    state = {
        dogs: [],
        loading: true,
        userId: localStorage.getItem("userId"),
        deletedDog: false
    }

    componentWillMount() {
        axios.get(`http://localhost:8080/usersdogs/${this.state.userId}`)
            .then(({ data }) => {
                this.setState({
                    dogs: data,
                    loading: false
                })
            })
    }


    componentDidUpdate = () => {
        if (this.state.deletedDog) {
            axios.get(`http://localhost:8080/usersdogs/${this.state.userId}`)
                .then(({ data }) => {
                    this.setState({
                        dogs: data,
                        loading: false,
                        deletedDog: false
                    })
                })
        }
    }


    removeDog = (dog) => {
        axios.delete(`http://localhost:8080/mydog/${dog}`)
            .then(
                this.setState({
                    deletedDog: true
                })
            )
    }


    render() {
        return (
            <div>
                {
                    !this.state.loading &&
                    <div>
                        <div>
                            {this.state.dogs[0] ? <h1> {this.state.dogs[0].owner}'s Dogs</h1> : <h1>You Dont Have Any Dogs!</h1>}
                            <Link to="/newdog"><button className="btn btn-outline-info">Register New Dog</button></Link>
                        </div>
                        <Doglist removeDog={this.removeDog} dogs={this.state.dogs} />
                    </div>

                }
            </div>
        )

    }
}

const Doglist = (props) => {
    return (
        props.loading ? <div>?</div> : props.dogs.map((dog, i) => {
            return (
                <div key={i} style={{ display: 'inline-block' }}>
                    <DogCard removeDog={props.removeDog} dog={dog} />
                </div>
            )
        })
    )
}


const DogCard = (props) => {
    const imageB64 = "base64," + props.dog.image.data
    return (
        <div className="card">
            <Link to={`/mydog/${props.dog._id}`}>
                <div className="usersDogs">
                    <img className="card-img-top img" src={"data:image/jpeg;" + imageB64} alt="Dog" />
                    <div className="card-body">
                        <h5 className="card-title">{props.dog.name}</h5>
                        <p className="card-text">Location : {props.dog.locationArea}</p>
                    </div>
                </div>
            </Link>
            <button className="btn btn-outline-danger" onClick={() => props.removeDog(props.dog._id)}>Remove Dog</button>
        </div>

    )
}

export default Userdogs