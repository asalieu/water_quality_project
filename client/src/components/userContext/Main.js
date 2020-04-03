import React from 'react';
import Marquee from 'react-marquee';
import Navbar from '../navbar/Navbar';
import LeftPanel from './LeftPanel';
import './css.css';
import Chart from '../userContext/Chart'
import { Link } from "react-router-dom";
import {Settings} from '@material-ui/icons' 
import { Bar, Scatter, Line, Pie } from 'react-chartjs-2' 
import { csv } from 'd3-request';
import url from '../userContext/sample.csv';
import Newchart from './newchart';  

 

var tr;
const API_KEY = 'e091fff3f8e3f791f442a48960501083';

class Main extends React.Component {

  state = { 
  }

  componentDidMount() {
   // fetch("/api/location")


        csv(url, function(err, data) {
           // console.log(data);
            tr = data;
        })  

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
                 <Link to="/Manage_Data" > Manage Data </Link>
              </li>
              <li>
                <Link to="/"> Generate Report</Link>
              </li>
              <li>
                <Link to="/"> FeedBack</Link>
              </li>
            </ul>

            <marquee>Wellcome User, below is the machine learning clasification result for your water three most recent water samples</marquee>
            <div className="container">   
            <Newchart />
            <Chart />
              <div className="flex_container">
                {/* <div class="item_1">
                  <h4>Water Sample A</h4>
                  <Chart />
                </div>
                <div class="item_2">
                  <h4>Water Sample B</h4>
                  <Chart />
                </div> */}
                <div class="item_3">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Main;