import React from 'react';
import Marquee from 'react-marquee';
import Navbar from '../navbar/Navbar';
import LeftPanel from './LeftPanel';
import './css.css';
import Chart from '../userContext/Chart'
import { Link } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { SettingsApplications } from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography'
import FileUpload from './FileUpload';
class Manage_Data extends React.Component {
    constructor() {
        super();
        this.state = {
            someKey: 'someValue'
        };
    }
    onChange(e){
        let file=e.target.file; 
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="row">
                        <div className=" col-sm-12 title-container">
                            <Navbar />
                        </div>
                    </div>
                    <div className="main">
                        <ul className="nav-panel">                              
                            <li>
                                <Link to="/Main"> Home</Link>
                            </li>

                        </ul> 
                        <div className="container">
                            <div className="_flex_container">
                                <div class="_item_1" >
                                    <h4><strong>Please Upload your <em>FCS</em> files here below</strong></h4> 
                                    <FileUpload />
                                </div>
                                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Manage_Data;
