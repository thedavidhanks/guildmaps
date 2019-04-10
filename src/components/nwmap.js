import React, { Component } from 'react';
import { ImageOverlay, Map, Marker, Popup } from 'react-leaflet';
import { CRS } from 'leaflet';
import firebase, { db } from '../firebase';
import moment from 'moment';

//import MapImage from '../images/CombinedNW.png';
import MapImage from './nwmap/New_World_Map_Dec_18.png';
import { iconConstruction, iconSimpleBrown, iconSimpleGrey, iconSimpleGold, iconSimpleDarkPurple } from './nwmap/icons.js';
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
        const dateAdded = (marker.addedOn) ? moment(marker.addedOn.toDate()).format('MMMM Do YYYY, h:mm:ss a') : null ;
        return(
        <Marker icon={iconFromType(marker.type)} key={marker.key} position={marker.latlong}>
            <Popup>
                <div className='marker_header'>{marker.type}</div>
                <div className='marker_notes'>{marker.notes}</div>
                { (marker.addedBy && marker.addedOn) ? <div className='marker_source'>-{marker.addedBy} on {dateAdded}</div> : null }
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
            //console.log(pointObj);
            markers.push(pointObj);
        });
        //make only changes to added, modified, removed
        //This will leave the unchanged data alone
        //https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots
        this.setState({markers});      
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();
        const user = firebase.auth().currentUser;
        if(user){
            var newPoint = {
                addedBy: user.email,
                type: this.state.newType,
                notes: this.state.newNotes,
                latlong: {lat: this.state.newMarkerLatLong.lat, lng: this.state.newMarkerLatLong.lng},
                addedOn: now
            };

            var fs_mapPoints = db.collection('/Games/PM2ahWu01w0wb5KQcoV8/Points');
            fs_mapPoints.add(newPoint).then( (docRef) => {console.log("Document written with ID: ", docRef.id);});
            this.setState({
                newMarker: false,
                newType: '',
                newNotes: ''
            });
        }else{
            //UPDATE: Change alert to Modal.
            alert("you must be logged in to add points");
        };
        
    };
    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
    });
}
    onDoubleClick = (e) => {
        console.log(e.latlng);
        const user = firebase.auth().currentUser;
        //show a new marker at the coords
        if(user){
        //if(true){
            this.setState({
                newMarker: true,
                newMarkerLatLong: e.latlng
            });
        }
        //close or lose focus, save the point.
    };
    componentDidMount() {
      this.unsubscribe = this.refPoints.onSnapshot(this.onCollectionUpdate);
    }
    render(){
        const mapCenter = [4887,10078];
        const overstyle = {
            border: '1px solid',
            width: '100%'
        };
        //const bounds = [[5840,-62.3],[14314,9835]];     
        const bounds = [[-62, 5841],[9835, 14316]];      
        return (
            <div style={overstyle}>
                <h4>New World</h4>
                <Map 
                    center={mapCenter}
                    zoom={this.state.zoom}
                    crs={CRS.Simple}
                    doubleClickZoom={false}
                    ondblclick={this.onDoubleClick}
                    minZoom={-3}
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