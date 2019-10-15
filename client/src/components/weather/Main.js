import React from 'react';
import Titles from './Titles';
import Form from './Form';
import Weather from './Weather';
import Navbar from '../navbar/Navbar';


const API_KEY = 'e091fff3f8e3f791f442a48960501083';

class Main extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    temp: [],
    tim: []
  }

componentDidMount(){
  fetch("/api/location")
      .then(res => res.json())
      .then(
        (result) => {
          let count = Object.keys(result.results).length;
          console.log("result length",count);
          console.log("Locations result",result);
          this.setState({
            city: result.results[count-1].Location
          });
          console.log("Latest city:",this.state.city);
        },
        (error) => {
          this.setState({
            error
          });
        }
      )


  this.getWeather(this.state.city);
}


  getWeather = async (cit) => {
    //e.preventDefault();

    let location = this.state.city;
    console.log("loc:",this.state.city);


    let wethermap = [];
    let wethermap1 = [];

    const city = cit;
    console.log("cit:",city);
    //const country = e.target.elements.country.value;


    //api.openweathermap.org/data/2.5/forecast?q=bangalore&appid=4d0c2c89dd6eb4410704582701c1cf9f&units=metric

    const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=bangalore&units=metric&appid=${API_KEY}`);
    const data = await apiCall.json();

    const apiCall2 = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${API_KEY}&units=metric`)
    const data2 = await apiCall2.json();

    let wetherdata = data2['list'];
    for (let i = 0; i < 6; i++) {
      wethermap.push(wetherdata[i].main.temp);
      wethermap1.push(wetherdata[i].dt_txt);
    }

    console.log("api call 1:",data);

    console.log(data2);

    console.log(wethermap);

    console.log(wethermap1);

    this.setState({
      temperature: (data.main && data.main.temp) ? data.main.temp : '',
      humidity: (data.main && data.main.humidity) ? data.main.humidity : '',
      description: (data.weather && data.weather[0].description) ? data.weather[0].description : '',
      error: (data.message) ? data.message : '',
      temp: wethermap,
      tim: wethermap1
    });
  };

  render() {
    let styles = {
      marginTop: '250px',
    };

    let forecastStyle = {
      width:'110px'
    };

    return (
      <div>
        <div className="wrapper">
        <div className="row">
                <div className=" col-sm-12 title-container">
                  <Navbar />
                </div>
            </div>
          <div className="main">
          
            <div className="container">           

              <div className="row" style={styles}>
                <div className="col-md-7 col-sm-12 form-container">
                  <div className="row">
                    <div class="forecast-container">

                      <div class="today forecast">
                        <div class="forecast-header">
                          <div class="day"></div>
                          <div class="date"></div>
                        </div>
                        <div class="forecast-content">
                          <div class="location">{this.state.city}</div>
                          <div class="degree">
                            <div class="num">{this.state.temperature}<sup>o</sup>C</div>
                            <div class="day">humidity:{this.state.humidity}</div>
                            <div class="day">{this.state.description}</div>
                            <div class="forecast-icon">
                              <img src="assets/images/icons/icon-1.svg" alt="" width="90" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.tim[0]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.temp[0]}<sup>o</sup>C</div>
                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.tim[1]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.temp[1]}<sup>o</sup>C</div>
                          
                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.tim[2]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.temp[2]}<sup>o</sup>C</div>
                          
                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.tim[3]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.temp[3]}<sup>o</sup>C</div>
                         
                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.tim[4]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.temp[4]}<sup>o</sup>C</div>
                          
                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.tim[5]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.temp[5]}<sup>o</sup>C</div>
                          
                        </div>
                      </div>

                    </div>

                  </div>

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