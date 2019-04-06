import React from 'react';
import { Popup } from 'react-leaflet';

import PopUpMarker from './PopUpMarker';
import { iconPeak } from './icons';
//This marker's popup is displayed when placed.

function SelectResource(props) {
    const resourceOptions = props.resources.map( (resource, key) =>      
        <option key={key} value={resource}>{resource}</option>
    );
    return(
        <select name='newType' value={props.newType} onChange={props.handleChange}>
            {resourceOptions}
        </select>);
};

const NewMarker = props => {
    return(
        <PopUpMarker 
            icon={iconPeak}
            position={props.position}>
            <Popup>
              <form onSubmit={props.handleSubmit}>
                <SelectResource resources={props.resources} newType={props.newType} handleChange={props.handleChange} /><br />
                <textarea rows="6" name="newNotes" placeholder="Notes" onChange={props.handleChange} value={props.newNotes} /><br />
                <button>Save</button>
              </form>
            </Popup>
        </PopUpMarker>
    );
};

export default NewMarker;
    
    
            