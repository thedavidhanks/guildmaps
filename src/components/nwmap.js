import React, { Component } from 'react';
import { ImageOverlay, Map, Marker, Popup } from 'react-leaflet';
import { CRS } from 'leaflet';
import firebase, { db } from '../firebase';

import MapImage from '../images/CombinedNW.png';
import { iconPeak, iconLandmark, iconConstruction, iconSimpleBrown, iconSimpleGrey, iconSimpleGold, iconSimpleDarkPurple } from './nwmap/icons.js';
import NewMarker from './nwmap/NewMarker';

function iconFromType(type){
    switch(type){
        case 'wood':
            return iconSimpleBrown;
        case 'stone':
            return iconSimpleDarkPurple;
        case 'iron':
            return iconSimpleGrey;
        case 'chest':
            return iconSimpleGold;
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
        console.log(marker.key + " - Added on:" + marker.addedOn);
        return(
        <Marker icon={iconFromType(marker.type)} key={marker.key} position={marker.latlong}>
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
            markers: [],
            resources: ['wood', 'stone', 'iron', 'chest']
            };
    };
    onCollectionUpdate = (points) =>{
        var markers = [];
        points.forEach( (point) =>{
            let pointObj = point.data();
            pointObj["key"] = point.id;
            console.log(pointObj);
            markers.push(pointObj);
        });
        //console.log(markers);
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
        });
        
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
        const mapCenter = [0,0];
        const overstyle = {
            border: '1px solid',
            width: '100%'
        };
        const bounds = [[-500,-500],[500,500]];      
        return (
            <div style={overstyle}>
                <h4>New World</h4>
                <Map 
                    center={mapCenter}
                    zoom={this.state.zoom}
                    crs={CRS.Simple}
                    doubleClickZoom={false}
                    ondblclick={this.onDoubleClick}
                    >
                  <ImageOverlay
                    url={MapImage}
                    bounds={bounds}
                  />
                  {this.state.newMarker ? <NewMarker position={this.state.newMarkerLatLong} resources={this.state.resources} handleSubmit={this.handleSubmit} handleChange={this.handleChange} newNotes={this.state.newNotes} newType={this.state.newType}/> : null}
                  {this.state.markers !== [] ? <MarkerList markers={this.state.markers} /> : null}
                </Map>
            </div>
        );
  }
  
};
 
export default NWmap;