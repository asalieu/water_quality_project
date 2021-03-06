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
        var newData = new  Array();
        fetch('../sampleout.csv')
            .then((response) => //response.json()
            {
                return response.text();
            }
            )
            .then((data) => {
                var xx = data.split("\n");
                // console.log(JSON.stringify(xx));
                
                var newData = xx.map(s=>({x:s.split(',')[0], y:s.split(',')[1]}));
                // console.log(newData);
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
               
                this.setState({
                    chartData: newData,
                    myx: xlabels,
                    data: {
                        datasets: [{ 
                            borderWidth: 1,
                            backgroundColor: 'rgba(255, 99,132,1.5)',
                           borderColor: 'rgb(155, 40, 122)',
                            label: 'Clean Water Sample',
                            data: newData
                                // {
                                //     x: xlabels[0][0],
                                //     y: xlabels[0][1]
                                // },


                            
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{                                
                                ticks: {
                                    max: 5,
                                    min: 0,
                                    stepSize: 0.5
                                },
                                type: 'linear',
                                position: 'bottom'
                            }]
                        }
                    }
                });
                console.log(this.state)   
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
                            text: 'Scatter plot of water sample',
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