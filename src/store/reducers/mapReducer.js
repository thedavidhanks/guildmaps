const initState = {
    points: [
        {
        key: 1,
        addedBy: "dphanks@gmail.com",
        addedOn: new Date('December 17, 1995 03:24:00'),
        latlong: {
            lat: 9138,
            lng: 3781
        },
        notes: '',
        type: 'stone'
        },
        {
        key: 2,    
        addedBy: "dphanks@gmail.com",
        addedOn: new Date(),
        latlong: {
            lat: 9138,
            lng: 3781
        },
        notes: '',
        type: 'stone'
        },
        {
        key: 3,    
        addedBy: "dphanks@gmail.com",
        addedOn: new Date('2019-04-12'),
        latlong: {
            lat: 9138,
            lng: 3781
        },
        notes: '',
        type: 'stone'
        }
    ]
};
const mapReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_POINT':
            console.log('created point', action.point);
            break;
        default:
            break;
    }
    return state;
};

export default mapReducer;