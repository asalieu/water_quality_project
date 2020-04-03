import React, { Component } from 'react';
import { Scatter, Line, Pie } from 'react-chartjs-2'
//import { csv } from 'd3-request';
//import url from '../userContext/sample.csv';

const xlabels = [];
const ytemps = [];
const mdata = [];
// var testTable = [];
// var year = [];
// var columns = [];

//var columns=[];
export class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [{}],
            myx: []
        };


    }

    componentDidMount() {
        fetch('../sample.csv')
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                const testTable = data.split("\n");
                testTable.forEach(row => {
                    const columns = row.split(",");
                    const year = columns;
                    xlabels.push(year)
                    const temp = columns[1];
                    ytemps.push(temp);
                    for (var i = 0; i < xlabels.length; i++) {
                        mdata.push([i])
                        return mdata
                    }
                    console.log(mdata)

                })



                for (let i = 0; i > xlabels.length; i++) {
                    const element = xlabels[i];
                    console.log("this is from Let function " + element)

                }
                this.setState({
                    chartData: xlabels,
                    myx: xlabels,
                    data: {
                        datasets: [{
                            label: 'Scatter Dataset',
                            data: [

                                {
                                    x: xlabels[0][0],
                                    y: xlabels[0][1]
                                },


                            ]
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'linear',
                                position: 'bottom'
                            }]
                        }
                    }
                });
                //console.log(this.state)   
                //console.log(xlabels[0])
                //console.log([this.state.chartData[0][0]])



                // console.log("from chartData " + this.state.chartData)
                // console.log("from myx " + this.state.myx)
            });
        // console.log("From after _csv " + chartData);

    }

    render() {

        return (


            <div className="chart">
                <Scatter
                    data={this.state.data}
                    options={{
                        title: {
                            display: true,
                            text: 'Largest population in the world',
                            fontSize: ''
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>


        )


    }
}
export default Chart