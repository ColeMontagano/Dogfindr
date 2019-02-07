import React, { Component } from "react"
import MapGL, { Marker, NavigationControl } from 'react-map-gl'

const TOKEN = 'pk.eyJ1IjoiY21vbnQyMyIsImEiOiJjam90MjBsbXQwd3RtM3BwdDEzaGIzeHpsIn0.Ba2XglradkNUW4i7rOhUgw';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 49.3,
                longitude: -123,
                zoom: 9,
                bearing: 0,
                pitch: 0,
                width: 1000,
                height: 500,
            }
        };
    }

    componentDidMount() {
        if (this.props.location === "Vancouver") {
            this.setState({
                viewport: {
                    latitude: 49.3,
                    longitude: -123,
                    zoom: 9,
                    bearing: 0,
                    pitch: 0,
                    width: 1000,
                    height: 500,
                }
            })
        } else if (this.props.location === "Calgary") {
            this.setState({
                viewport: {
                    latitude: 51.05,
                    longitude: -114,
                    zoom: 9.5,
                    bearing: 0,
                    pitch: 0,
                    width: 1000,
                    height: 500,
                }
            })
        }
    }

    _updateViewport = viewport => {
        this.setState({ viewport })
    }

    handleClick = (e) => {
        this.props.updateLocation(e.lngLat[0], e.lngLat[1])
    }


    render() {
        const { viewport } = this.state;
        return (
            <MapGL
                onClick={this.handleClick}
                {...viewport}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}
                mapStyle={"mapbox://styles/cmont23/cjot39p8hcyd72sqoyj0fzx66"}
                mapboxApiAccessToken={TOKEN}>
                <div className="nav mapNav">
                    <NavigationControl onViewportChange={this._updateViewport} />
                    {this.props.dog.location && (
                        <Marker latitude={this.props.dog.location.lat} longitude={this.props.dog.location.lng} offsetLeft={-20} offsetTop={-10}>
                            <div className="marker"></div>
                        </Marker>
                    )
                    }
                </div>

            </MapGL>
        );
    }
}
