import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    title: '',
    height: '100'
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          height={this.props.height}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.title,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      </div>
    )
  }
}

export default Chart;