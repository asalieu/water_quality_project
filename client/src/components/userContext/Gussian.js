import React, { Component } from 'react';
import { Line, Scatter, Bar, Radar, Bubble,Area,Mixed,Pie,Doughnut } from 'react-chartjs-2'
import { Link } from '@material-ui/core';
//import { response } from 'express';
//import { response } from 'express';

const xlabels = [];
const ytemps = [];
const testTable = [];
var year = [];
var columns = [];

class Gussian extends React.Component {
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
                        labels: [4, 6, 9, 10, 15, 22,44, 36, 19, 11, 9, 4],
                        datasets: [
                            {
                                label: "Bacteria Cells",
                                backgroundColor: "rgba(255,0 ,255 , 0.75)",
                                data: [4, 6, 9, 10, 15, 22,44, 36, 19, 11, 9, 4]
                                //data:xlabels
                            },
                            {
                               label: "Debries",
                               backgroundColor: "rgba(0 ,255 ,0, 0.75)",
                               data: [44, 36, 19, 11, 9, 4, 22, 77,16, 13, 10,13]
                               //data:ytemps
                            }
                        ],
                        options:{
                            scale: {
                                angleLines: {
                                    display: false
                                },
                                ticks: {
                                    suggestedMin: 50,
                                    suggestedMax: 100
                                }
                            }
                        }
                    }
                });

                console.log("From after _csv " +year);
               // console.log("From after columns " + columns);
            });


    }
    // width: 800, height: 650 

    render() {
        return (
            <div style={{ position: "relative"}}>
                
                <Radar
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

export default Gussian;
