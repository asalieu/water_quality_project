import React, { Component } from 'react';


export class Tes extends Component {
    constructor() {
        super();

    }

    render() {
        return <p>{this.state.someKey}</p>;
    }

    componentDidMount() {
        var xWerte = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var yWerte = [3, 4, 2, 5, 7, 5, 7, 8, 4, 4, 3];

        var chartData = {
            datasets: [{
                label: 'Test',
                data: []
            }]
        }

        for (var i = 0; i < yWerte.length; i++) {
            chartData.datasets[0].data.push(
                {
                    x: xWerte[i], // You don't need "xWerte", you can simply use "i" when it's always the increment
                    y: yWerte[i]
                }
            )
        }

        var chartOptions = {
            responsive: true
        }

        var ctx = document.getElementById('canvas').getContext('2d');
        var myChart = new (ctx, {
            type: 'scatter',
            data: chartData,
            options: chartOptions
        });
    }
}

export default Tes;


