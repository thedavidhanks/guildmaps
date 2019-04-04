import React from 'react';
import { Popup } from 'react-leaflet';

import PopUpMarker from './PopUpMarker';
import { iconPeak, iconLandmark, iconConstruction } from '../icons.js';

//This marker's popup is displayed when placed.
const NewMarker = props => {
    return(
        <PopUpMarker 
            icon={iconPeak}
            position={props.position}>
            <Popup>
              <form onSubmit={props.handleSubmit}>
                <input type="text" name="newType" placeholder="What is this?" onChange={props.handleChange} value={props.newType} /><br />
                <input type="text" name="newNotes" placeholder="What are you bringing ?" onChange={props.handleChange} value={props.newNotes} /><br />
                <button>Save</button>
              </form>
            </Popup>
        </PopUpMarker>
    );
};

export default NewMarker;
    
    
            