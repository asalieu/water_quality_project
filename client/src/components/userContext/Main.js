import React from 'react';
import Marquee from 'react-marquee';
import Navbar from '../navbar/Navbar';
import LeftPanel from './LeftPanel';
import './css.css';
import Chart from '../userContext/Chart'
import { Link } from "react-router-dom";
import { Settings } from '@material-ui/icons'
import { Bar, Scatter, Line, Pie } from 'react-chartjs-2'
import { csv } from 'd3-request';
import url from '../userContext/sample.csv';
import Newchart from './newchart';
import historam from './histogram';
import Histogram from './histogram';
import Gussian from './Gussian';
import Gussianchart from './Gussianchart';
import LoadImage from './LoadImage';
import New from './New';
import New1 from './New1';
const photo = '../photo.png'


var tr;
const API_KEY = 'e091fff3f8e3f791f442a48960501083';

class Main extends React.Component {

  state = {
  }

  componentDidMount() {
    // fetch("/api/location")


    csv(url, function (err, data) {
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
          <div className="main"><br />

            <div className="row">

            </div>
            <ul className="nav-panel">
              <li>
                <Link to="/Manage_Data" > Upload Data </Link>
              </li>
              {/* <li>
                <Link to="/"> Generate Report</Link>
              </li>
              <li>
                <Link to="/"> FeedBack</Link>
              </li> */}
            </ul>
            <div className="h2row">
              <h2>Visualization and Plotting</h2>
            </div>



            <div className="flex_container"
            >

              <div class="item_1">
                <Chart />
              </div>
              <div class="item_2">
                <New />
              </div>
              <div class="item_3">
                <Newchart />
              </div>
              <div class="item_4">
                <New1 />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Main;