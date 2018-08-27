import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries, SplineSeries
} from 'react-jsx-highcharts';
import _ from 'lodash';
import 'tachyons';

const urls = [
  'https://s3.amazonaws.com/logtrust-static/test/test/data1.json',
  'https://s3.amazonaws.com/logtrust-static/test/test/data3.json',
  'https://s3.amazonaws.com/logtrust-static/test/test/data3.json'
]

const plotOptions = {
  chart: {
    type: 'line'
  },
  credits: {
    enabled: 'false'
  },
  title: {
    text: 'null'
  },
  yAxis: {
    title: {
      text: 'null'
    }
  },
  xAxis: {
    type: 'datetime'
  },
  legend: {
    enabled: 'false'
  },
  series: [{
    'data': 'plot'
  }],
  plotOptions: {
    series: {
      animation: {
        duration: 0
      }
    }
  },
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      data1: {
        d: [],
        value: [],
        cat: []
      },
      data2: {
        myDate: [],
        categ: [],
        val: []
      },
      data3: {
        raw: [],
        val: [],
      }
    }
  }
  componentDidMount() {
    fetch(urls[0])
      .then(response => response.json())
      .then(firstdataset => {this.setState({data1: firstdataset})});
    fetch(urls[1])
      .then(response => response.json())
      .then(seconddataset => {this.setState({data2: seconddataset})});
    fetch(urls[2])
      .then(response => response.json())
      .then(thirddataset => {this.setState({data3: thirddataset})});

  }
  render() {
    const { data1, data2, data3 } = this.state;
    return !data1.length ?
      <h1>Loading</h1> :
    (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
            <HighchartsChart plotOptions={plotOptions}>
              <Chart />

              <Title>Ejercicio 2</Title>
              <Subtitle>Dataset 1</Subtitle>
              <Legend layout="vertical" align="right" verticalAlign="middle" />

              <XAxis type="datetime">
                <XAxis.Title>Time</XAxis.Title>
              </XAxis>

              <YAxis>
                <YAxis.Title>Value</YAxis.Title>
                <LineSeries name="Cat 1" data={this.state.data1.map(data => {
                  return data.cat==="Cat 1"? [data.d, data.value] : false;
                }).filter(data => data)} />
                <LineSeries name="Cat 2" data={this.state.data1.map(data => {
                  return data.cat==="Cat 2"? [data.d, data.value] : false;
                }).filter(data => data)} />
                <LineSeries name="Cat 3" data={this.state.data1.map(data => {
                  return data.cat==="Cat 3"? [data.d, data.value] : false;
                }).filter(data => data)} />
                <LineSeries name="Cat 4" data={this.state.data1.map(data => {
                  return data.cat==="Cat 4"? [data.d, data.value] : false;
                }).filter(data => data)} />
              </YAxis>

            </HighchartsChart>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
