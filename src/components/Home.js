import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render(){
        return <h3>Home</h3>;
    }
};

const mapStateToProps = (state) => {
    return {
        points: state.map.points
    };
};

export default connect(mapStateToProps)(Home);