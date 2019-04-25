import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { auth, provider } from './firebase.js'

import BSnavbar from './components/BSnavbar'
import NWmap from './components/nwmap'
import ProjectHome from './components/project_home'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import MapsHome from './components/MapsHome'
import Home from './components/Home'

class App extends Component {
    constructor(props){
        super(props);        
        this.state = { 
            menuItems: [
                {name: "Tools", path: "/tools"}, 
                {name: "Projects", path: "/projects"}, 
                {name: "Map", path: "/about"}
            ],
            username: '',
            user: null
        };
    }
    logout = () => {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
             });
    }
    login = () => {
        auth.signInWithPopup(provider)
                .then((result) =>{
                    const user = result.user;
                    this.setState({
                        user
                    });
        });
    }  
    render(){
        return (
        <BrowserRouter>
            <div className="container-fluid">
                <BSnavbar user={this.state.user} login={this.login} logout={this.logout}/>
                <div role="main" className="row">
                    <Route path="/" exact component={Home} />
                    <Route exact path="/maps" component={MapsHome}/>
                    <Route 
                        path='/maps/nwmap'
                        render={()=><MapPage user={this.state.user} />}
                    />
                    <Route path="/rosters" component={ProjectHome}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/signup" component={SignUp}/>
                </div>
            </div>
        </BrowserRouter>
        );
    }
};


class MapPage extends Component{
    render(){
        return(
        <div className="col">
            {//this.props.user ? <NWmap   user={this.props.user} /> : <h4>Login required to view this page</h4>}
            null}
            {true ? <NWmap   user={this.props.user} /> : <h4>Login required to view this page</h4>}
        </div>
        );
    };
 };
 
 export default App;