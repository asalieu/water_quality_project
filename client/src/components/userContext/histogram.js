import React from 'react';
import { Line, Scatter, Bar, Radar, Bubble, Area, Mixed, Pie, Doughnut,horizontalBar } from 'react-chartjs-2'
import { Link } from '@material-ui/core';
//import { response } from 'express';
//import { response } from 'express';

const xlabels = [];
const ytemps = [];
const testTable = [];
var year = [];
var columns = [];



class Histogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _csv: []
        };

    }
    componentDidMount() {
        fetch('../tsample.csv')
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                const table = data.split('\n');
                table.forEach(row => {
                    columns = row.split(",");
                    year = columns[0];
                    xlabels.push(year)
                    const temp = columns[1];
                    ytemps.push(temp);
                })

                this.setState({
                    _csv: data,
                    data: {
                        labels: xlabels,
                        datasets: [{
                            borderWidth: 1,
                            backgroundColor: 'rgba(255, 99,132,0.5)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: [3, 1, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0]
                        }, {
                            type: 'line',
                            fill: false,
                            borderWidth: 1,
                            data: [
                                {
                                    "x": 22.4175611241375584,
                                    "y": 10
                                },
                                {
                                    "x": 4.4175611241375584,
                                    "y": 19
                                },
                                {
                                    "x": 17.4175611241375584,
                                    "y": 110
                                    },
                            ],
                            borderColor: 'rgb(54, 162, 235)',
                            radius: 2
                        }]
                    },

                });

                console.log("From after _csv " + year);
                // console.log("From after columns " + columns);
            });


    }
    // width: 800, height: 650 

    render() {
        return (
            <div style={{ position: "relative" }}>
                <Scatter
                    options={{
                        responsive: true
                    }}
                    data={this.state.data}
                />
                <br />

            </div>
        )
    }
}
export default Histogram;
