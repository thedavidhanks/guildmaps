export const createPoint = (point) => {
    return (dispatch, getState) => {
        //make async call to database
        dispatch({ type: 'CREATE_POINT', point });
    };
};