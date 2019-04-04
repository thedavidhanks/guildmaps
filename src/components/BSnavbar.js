import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class BSnavbar extends Component {
    render() {
      return (
              <div className="navbar navbar-expand-md navbar-dark bg-dark fixed-top row">
                  <a className="navbar-brand" href="/">Guild Maps</a>
                  <div className="collapse navbar-collapse">
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/rosters" activeClassName="active">Rosters<span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item dropdown">
                          <NavLink className="nav-link dropdown-toggle" to="/tools" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" rel="noreferrer" activeClassName="active">Maps</NavLink>
                          <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <NavLink className="dropdown-item" to="/tools/nwmap" activeClassName="active">New World</NavLink>
                            <NavLink className="dropdown-item" to="/tools/accumcalc" activeClassName="active">Another Game</NavLink>
                          </div>
                        </li>
                        
                      </ul>
                      <div className=" my-2 my-lg-0">
                      {this.props.user ? <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.props.logout}>Logout</button> : <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.props.login}>Login</button>}
                      </div>
                  </div>
              </div>
      );
    }
};

export default BSnavbar;
