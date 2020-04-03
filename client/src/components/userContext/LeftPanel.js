import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
//import AppBar from "material-ui/AppBar";
import { Icon, TableHead, CardHeader, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from "react-router-dom";
//import iLogo from '../images/iLogo.PNG';


export class LeftPanel extends Component {
    render() {
        return (


            <div className="col-md-4">
                <nav className="navbar-nav">
                    <ul className="nav-panel">
                        <li>
                            <Link to="/" > Manage Data </Link>
                        </li>
                        <li>
                            <Link to="/"> Generate Report</Link>
                        </li>
                        <li> 
                            <Link to="/"> FeedBack Blog </Link>
                        </li>
                    </ul>

                </nav>
            </div>

        )
    }

}
export default LeftPanel;