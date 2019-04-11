import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class BSnavbar extends Component {
    render() {
      return (
              <div className="navbar navbar-expand-md navbar-dark bg-dark fixed-top row">
                  <Link to="/" className="navbar-brand">Guild Maps</Link>
                  <div className="collapse navbar-collapse">
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/rosters" activeClassName="active">Rosters<span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item dropdown">
                          <NavLink className="nav-link dropdown-toggle" to="/maps" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" rel="noreferrer" activeClassName="active">Maps</NavLink>
                          <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <NavLink className="dropdown-item" to="/maps/nwmap" activeClassName="active">New World</NavLink>
                          </div>
                        </li>
                        
                      </ul>
                      
                      <div className="my-2 my-lg-0">
                      {this.props.user ? <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.props.logout}>Logout</button> : <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.props.login}>Login</button>}
                      </div>
                  </div>
              </div>
      );
    }
};

export default BSnavbar;
