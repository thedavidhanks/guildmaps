import React, { Component } from 'react';
import { ImageOverlay, Map, Marker, Popup } from 'react-leaflet';
import { CRS } from 'leaflet';
import firebase, { db } from '../firebase';

import MapImage from '../images/CombinedNW.png';
import { iconPeak, iconLandmark, iconConstruction } from './icons.js';
import NewMarker from './nwmap/NewMarker';

function iconFromType(type){
    switch(type){
        case 'stone':
            return iconPeak;
        case 'wood':
            return iconLandmark;
        default:
            return iconConstruction;       
    }
}

const MarkerList = props =>{
    //props.markers will be an array of marker objects
    
    //cycle through each element of the array.
    const markerlist = props.markers.map((marker, index) => {
        //console.log(marker);
        
        const dateAdded = (marker.addedOn) ? new Date(marker.addedOn) : null ;
        console.log(marker.id + " - " +marker.addedOn);
        return(
        <Marker icon={iconFromType(marker.type)} key={index} position={marker.latlong}>
            <Popup>
                <div className='marker_header'>{marker.type}</div>
                <div className='marker_notes'>{marker.notes}</div>
                { (marker.addedBy && marker.addedOn) ? <div className='marker_source'>-{marker.addedBy} on </div> : null }
            </Popup>
        </Marker>
        );}
    );
    return markerlist;
};
        
class NWmap extends Component {
   constructor(){
        super();
        this.refPoints = db.collection('/Games/PM2ahWu01w0wb5KQcoV8/Points');
        
        this.state = {
            newMarker: false,
            newType: '',
            newNotes: '',
            lat: 0,
            lng: 0,
            zoom: 0,
            newMarkerLatLong: {},
            markers: [
                {
                addedBy: "dave",
                addedOn: "April 1, 2019",
                type: "stone",
                notes: 'stone here',
                latlong: {lat: 156, lng: -377}},
                {
                type: "wood",
                notes: 'big wood',
                latlong: {lat: 20, lng: -238.875}},
                {
                type: "default",
                notes: 'small wood',
                latlong: {lat: 30, lng: -209.625}}
            ]                
            };
    };
    onCollectionUpdate = (points) =>{
        var markers = [];
        points.forEach( (point) =>{
            markers.push(point.data());
            console.log(point.data()); 
        });
        console.log(markers);
        this.setState({markers});      
    };

    handleSubmit = (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        const now = new Date();
        var newPoint = {
            addedBy: user.email,
            type: this.state.newType,
            notes: this.state.newNotes,
            latlong: {lat: this.state.newMarkerLatLong.lat, lng: this.state.newMarkerLatLong.lng},
            addedOn: now
        };
        //{ Lat: 100, Lng: -100 }
        //latlong: this.state.newMarkerLatLong
        var fs_mapPoints = db.collection('/Games/PM2ahWu01w0wb5KQcoV8/Points');
        fs_mapPoints.add(newPoint).then( (docRef) => {console.log("Document written with ID: ", docRef.id);});
        this.setState({
            newMarker: false,
            newType: '',
            newNotes: ''
        })
        
    };
    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
    });
}
    onDoubleClick = (e) => {
        console.log(e.latlng);
        
        //show a new marker at the coords
        this.setState({
            newMarker: true,
            newMarkerLatLong: e.latlng
        });
        //close or lose focus, save the point.
    };
    componentDidMount() {
      this.unsubscribe = this.refPoints.onSnapshot(this.onCollectionUpdate);
    }
    render(){
        const position = this.state.markers[1].latlong;//[this.state.lat, this.state.lng];
        const overstyle = {
            border: '1px solid',
            width: '100%'
        };
        const bounds = [[-500,-500],[500,500]];      
        return (
            <div style={overstyle}>
                <h4>New World</h4>
                <Map 
                    center={position}
                    zoom={this.state.zoom}
                    crs={CRS.Simple}
                    doubleClickZoom={false}
                    ondblclick={this.onDoubleClick}
                    >
                  <ImageOverlay
                    url={MapImage}
                    bounds={bounds}
                  />
                  {this.state.newMarker ? <NewMarker position={this.state.newMarkerLatLong} handleSubmit={this.handleSubmit} handleChange={this.handleChange} newNotes={this.state.newNotes} newType={this.state.newType}/> : null}
                  {this.state.markers ? <MarkerList markers={this.state.markers} /> : null}
                </Map>
            </div>
        );
  }
  
};
 
export default NWmap;