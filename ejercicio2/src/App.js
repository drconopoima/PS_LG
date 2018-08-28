import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';
import _ from 'lodash';
import 'tachyons';

let dataTotals2 = {
  'CAT 1': [],
  'CAT 2': [],
  'CAT 3': [],
  'CAT 4': []
}

const urls = [
  'https://s3.amazonaws.com/logtrust-static/test/test/data1.json',
  'https://s3.amazonaws.com/logtrust-static/test/test/data2.json',
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
      rawData: [],
      data1: {},
      data2: {},
      data3: {},
      consolidatedData: true,
      dataTotals: {},
      /*  date: {
          'CAT 1': 0,
          'CAT 2': 0,
          'CAT 3': 0,
          'CAT 4': 0
        }
        dates: []
      }
      */
      categoryTotals: {},
      /*
        'CAT 1': 0,
        'CAT 2': 0,
        'CAT 3': 0,
        'CAT 4': 0,
      }
      */
    }
  }
  componentDidMount() {
    const promise1 = fetch(urls[0]).then(response => response.json())

    promise1.then(firstdataset => this.setState({data1: firstdataset}));

    const promise2 = fetch(urls[1]).then(response => response.json())

    promise2.then(seconddataset => this.setState({data2: seconddataset}));

    const promise3 = fetch(urls[2]).then(response => response.json())

    promise3.then(thirddataset => this.setState({data3: thirddataset}));

    Promise.all([promise1, promise2, promise3])
      .then(allResponses => this.setState({rawData: allResponses}))
  }
  componentDidUpdate() {
    if (this.state.consolidatedData) {
      const {data1, data2, data3} = this.state
      let {dataTotals, categoryTotals} = this.state
      dataTotals.dates = [];
      if (data1.length && data2.length && data3.length) {
        let whichCAT
        let value
        let whichDate
        this.state.consolidatedDate = false; // no consolidar la data dos veces en subsiguientes updates
        categoryTotals = {
          'CAT 1': 0,
          'CAT 2': 0,
          'CAT 3': 0,
          'CAT 4': 0
        }
        for (let elementData1 of data1) {
          whichCAT = elementData1.cat.toUpperCase();
          whichDate = this.formatDate(new Date(elementData1.d));
          value = Number(elementData1.value);
          if (whichDate in dataTotals) {
            if (whichCAT in dataTotals[whichDate]) {
              dataTotals[whichDate][whichCAT] += value;
              categoryTotals[whichCAT] += value;
            } else {
              dataTotals[whichDate][whichCAT] = 0;
              dataTotals[whichDate][whichCAT] += value;
              categoryTotals[whichCAT] += value;
            }
          } else {
            dataTotals.dates = [...dataTotals.dates,whichDate];
            dataTotals[whichDate] = {};
            dataTotals[whichDate][whichCAT] = 0;
            dataTotals[whichDate][whichCAT] += value;
            categoryTotals[whichCAT] += value;
          }
        }
        for (let elementData2 of data2) {
          let whichCAT
          let value
          let whichDate
          whichCAT = elementData2.categ.toUpperCase();
          value = Number(elementData2.val);
          whichDate = this.formatDate(new Date(elementData2.myDate));
          if (whichDate in dataTotals) {
            if (whichCAT in dataTotals[whichDate]) {
              dataTotals[whichDate][whichCAT] += value;
              categoryTotals[whichCAT] += value;
            } else {
              dataTotals[whichDate][whichCAT] = value;
              categoryTotals[whichCAT] += value;
            }
          } else {
            dataTotals[whichDate] = {};
            dataTotals[whichDate][whichCAT] = value;
            categoryTotals[whichCAT] += value;
          }
        }
        this.state.dataTotals = dataTotals;
        this.state.categoryTotals = categoryTotals;
      }
    }
  }
  render() {
    if (!(_.isEmpty(this.state.categoryTotals) && _.isEmpty(this.state.dataTotals))) {
      for(let i=0; i<this.state.dataTotals.dates.length; i++) {
        dataTotals2['CAT 1'][i] = [this.state.dataTotals.dates[i], this.state.dataTotals[this.state.dataTotals.dates[i]]['CAT 1']];
        dataTotals2['CAT 2'][i] = [this.state.dataTotals.dates[i], this.state.dataTotals[this.state.dataTotals.dates[i]]['CAT 2']];
        dataTotals2['CAT 3'][i] = [this.state.dataTotals.dates[i], this.state.dataTotals[this.state.dataTotals.dates[i]]['CAT 3']];
        dataTotals2['CAT 4'][i] = [this.state.dataTotals.dates[i], this.state.dataTotals[this.state.dataTotals.dates[i]]['CAT 4']];
      }
    }
    console.log(dataTotals2['CAT 1'][0])
    return (_.isEmpty((this.state.categoryTotals)) && _.isEmpty(this.state.dataTotals)) ?
      <h1>Loading</h1> :
    (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
            <HighchartsChart plotOptions={plotOptions}>
              <Chart />

              <Title>Ejercicio 2</Title>
              <Subtitle>Dataset 1 y 2 consolidados juntos</Subtitle>
              <Legend layout="vertical" align="right" verticalAlign="middle" />

              <XAxis type="datetime">
                <XAxis.Title>Time</XAxis.Title>
              </XAxis>

              <YAxis>
                <YAxis.Title>Value</YAxis.Title>
                      <LineSeries name="CAT 1" data={dataTotals2['CAT 1']} />
                      <LineSeries name="CAT 2" data={dataTotals2['CAT 2']} />
                      <LineSeries name="CAT 3" data={dataTotals2['CAT 3']} />
                      <LineSeries name="CAT 4" data={dataTotals2['CAT 4']} />
              </YAxis>

            </HighchartsChart>
        </header>
        </div>
    )
  }
  formatDate(d) {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}

export default withHighcharts(App, Highcharts);
