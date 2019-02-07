import React, { Component } from "react"
import axios from "axios"
import FormData from 'form-data'

class Newdog extends Component {

    render() {
        return (
            <div className="container">
                <h1>Register Your Dog</h1>
                <div className="card registerCard">
                    <div className="card-body">
                        <SignupInput history={this.props.routerProps[0].history} userId={this.props.userId} user={this.props.user} activeDog={this.props.activeDog} />
                    </div>
                </div>
            </div>
        )
    }
}

class SignupInput extends Component {
    state = {
        dogname: "",
        description: "",
        locationArea: "Vancouver",
        lost: false,
        selectedFile: null,
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    signup = () => {
        if (!this.state.dogname || !this.state.description || !this.state.selectedFile) {
            alert("Looks Like You Forgot Something")
        } else {
            const formData = new FormData()
            formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
            let dog = { name: this.state.dogname, owner: this.props.user.user.displayName, user: this.props.userId, email: this.props.user.user.email, lost: this.state.lost, description: this.state.description, locationArea: this.state.locationArea, img: this.state.selectedFile, image: formData }
            axios.post(`http://localhost:8080/newdog/`, dog)
                .then(({ data }) => {
                    this.props.activeDog(data)
                    axios.put(`http://localhost:8080/mydog/${data._id}/image`, formData)
                        .then(() => this.props.history.push("/mydogs"))
                })
        }
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Dog Name : </label>
                    <input type="text" onChange={(e) => { this.setState({ dogname: e.target.value }) }} className="form-control" placeholder="Enter Your Dogs Name" />
                    <label> City:</label>
                    <select className="form-control" value={this.state.locationArea} onChange={(e) => { this.setState({ locationArea: e.target.value }) }}>
                        <option value="Vancouver">Vancouver</option>
                        <option value="Calgary">Calgary</option>
                    </select>
                    <label>Description : </label>
                    <textarea onChange={(e) => { this.setState({ description: e.target.value }) }} className="form-control" />
                    <label className="form-check-label">
                        <input className="form-check-input" onClick={() => this.setState({ lost: !this.state.lost })} defaultChecked={this.state.lost} type="checkbox" value="" /> Missing
                </label>
                </div>
                <label className="btn btn-outline-info" htmlFor="file-upload">
                    Upload Photo
                </label>
                <input id="file-upload" onChange={this.fileChangedHandler} type="file" />
                <button className="form-control btn btn-outline-info" onClick={this.signup} type="btn">Submit</button>
            </div >
        )
    }
}

export default Newdog