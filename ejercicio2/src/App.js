import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';
import addHighchartsMore from 'highcharts/highcharts-more';
import _ from 'lodash';
import 'tachyons';

addHighchartsMore(Highcharts);

const urls = [
  'https://s3.amazonaws.com/logtrust-static/test/test/data1.json',
  'https://s3.amazonaws.com/logtrust-static/test/test/data2.json',
  'https://s3.amazonaws.com/logtrust-static/test/test/data3.json'
]

let dataTotals2 = {
  'CAT 1': [],
  'CAT 2': [],
  'CAT 3': [],
  'CAT 4': []
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      rawData: [],
      data1: {}, // Raw data fetched from data1
      data2: {}, // Raw data fetched from data2
      data3: {}, // Raw data fetched from data3
      consolidatedData: true, // When finishes fetching all data doesn't attempt to consolidate again
      dataTotals: {},
      /*
      dataTotals: {
          'CAT 1': valueCAT1,
          'CAT 2': valueCAT2,
          'CAT 3': valueCAT3,
          'CAT 4': valueCAT4
        }
      }
      */
      categoryTotals: {},
      /*
      categoryTotals: {
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

    promise3.then(thirddataset => {
      let data3 = thirddataset;
       // Regex que busca una fecha formato YYYY-MM-DD (dias y mes con ceros al comienzo). Fuente: Johan Södercrantz at RegexLib
       // http://regexlib.com/DisplayPatterns.aspx?cattabindex=4&categoryId=5&AspxAutoDetectCookieSupport=1
       // Modificado ligeramente para evitar el año 0000 (no existio, el año anterior al 0001 DC fue el 0001 AC)
       // También quité el "$" y el "^" para evitar que sólo compare con todo el string desde el comienzo (^) hasta el final (*),
      let regexDate = /[0-9]{3}[1-9]{1}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))+/g;
      let regexCAT = /(#[C]{1}[A]{1}[T]{1} [1234]{1}#)+/g;
      thirddataset.forEach((intdata, index) => {
      intdata.myDate = intdata.raw.match(regexDate)[0];
      intdata.CAT = intdata.raw.match(regexCAT)[0].replace(/#/g,'');
      data3.index = intdata;
      })
      this.setState({data3: data3})
      console.log(this.state.data3)
    });

    Promise.all([promise1, promise2, promise3])
      .then(allResponses => this.setState({rawData: allResponses}))
  }
  componentDidUpdate() {
    if (this.state.consolidatedData) {
      let {data1, data2, data3, dataTotals, categoryTotals} = this.state
      dataTotals.dates = [];
      if (data1.length && data2.length && data3.length) {
        let whichCAT
        let value
        let whichDate
        this.setState({consolidatedData: false}); // no consolidar la data otra vez en subsiguientes updates
        categoryTotals = {
          'CAT 1': 0,
          'CAT 2': 0,
          'CAT 3': 0,
          'CAT 4': 0
        }
        for (let elementData1 of data1) {
          whichCAT = elementData1.cat.toUpperCase();
          whichDate = this.formatDateReadable(new Date(elementData1.d));
          value = Number(elementData1.value);
          if (whichDate in dataTotals) {
            if (whichCAT in dataTotals[whichDate]) {
              dataTotals[whichDate][whichCAT] += value;
              categoryTotals[whichCAT] += value;
            } else {
              dataTotals[whichDate][whichCAT] = value;
              categoryTotals[whichCAT] += value;
            }
          } else {
            dataTotals.dates = [...dataTotals.dates,whichDate];
            dataTotals[whichDate] = {[whichCAT]: value};
            categoryTotals[whichCAT] += value;
          }
        }
        for (let elementData2 of data2) {
          whichCAT = elementData2.categ.toUpperCase();
          value = Number(elementData2.val);
          whichDate = this.formatDateReadable(new Date(elementData2.myDate));
          if (whichDate in dataTotals) {
            if (whichCAT in dataTotals[whichDate]) {
              dataTotals[whichDate][whichCAT] += value;
              categoryTotals[whichCAT] += value;
            } else {
              dataTotals[whichDate][whichCAT] = value;
              categoryTotals[whichCAT] += value;
            }
          } else {
            dataTotals.dates = [...dataTotals.dates,whichDate];
            dataTotals[whichDate] = {[whichCAT]: value};
            categoryTotals[whichCAT] += value;
          }
        }
        for (let elementData3 of data3) {
          whichCAT = elementData3.CAT.toUpperCase();
          value = Number(elementData3.val);
          whichDate = this.formatDateReadable(new Date(elementData3.myDate));
          if (whichDate in dataTotals) {
            if (whichCAT in dataTotals[whichDate]) {
              dataTotals[whichDate][whichCAT] += value;
              categoryTotals[whichCAT] += value;
            } else {
              dataTotals[whichDate][whichCAT] = value;
              categoryTotals[whichCAT] += value;
            }
          } else {
            dataTotals.dates = [...dataTotals.dates,whichDate];
            dataTotals[whichDate] = {[whichCAT]: value};
            categoryTotals[whichCAT] += value;
          }
        }
        dataTotals.dates.sort();
        this.setState({dataTotals: dataTotals});
        this.setState({categoryTotals: categoryTotals});
      }
    }
  }
  render() {
    if (!(_.isEmpty(this.state.categoryTotals) && _.isEmpty(this.state.dataTotals))) {
      let whichDateInMilliseconds
      let keyDateString
      for(let i=0; i<this.state.dataTotals.dates.length; i++) {
        keyDateString = this.state.dataTotals.dates[i];
        whichDateInMilliseconds = this.formatDateInMilliseconds(keyDateString)
        dataTotals2['CAT 1'][i] = [whichDateInMilliseconds, this.state.dataTotals[keyDateString]['CAT 1']];
        dataTotals2['CAT 2'][i] = [whichDateInMilliseconds, this.state.dataTotals[keyDateString]['CAT 2']];
        dataTotals2['CAT 3'][i] = [whichDateInMilliseconds, this.state.dataTotals[keyDateString]['CAT 3']];
        dataTotals2['CAT 4'][i] = [whichDateInMilliseconds, this.state.dataTotals[keyDateString]['CAT 4']];
      }
    }
    return (_.isEmpty((this.state.categoryTotals)) && _.isEmpty(this.state.dataTotals)) ?
      <h1>Loading</h1> :
    (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
            <HighchartsChart>
              <Chart />

              <Title>Ejercicio 2</Title>
              <Subtitle>Dataset 1, 2 y 3 consolidados juntos</Subtitle>
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
  formatDateReadable(dateObject) {
    /* Toma un objeto Date y lo formatea en formato legible YYYY/MM/DD. Esto se usa para proporcionar como
     * KEYS para el Objeto dataTotals sumando todos los valores agrupados por fecha y por clave
     *
     * Basado en la respuesta de user347000953 en Stack Overflow bajo licensia cc by-sa 3.0 con atribución
     * requerida.
     * https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd
    */
    let month = '' + (dateObject.getMonth() + 1);
    let day = '' + dateObject.getDate();
    let year = dateObject.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  formatDateInMilliseconds(date) {
    // Toma una fecha en String y la formatea en milisegundos. Aunque data1 esté en milisegundos, es necesario
    // convertir primero a fecha YYYY/MM/DD y luego a milisegundos porque un día tiene muchos milisegundos
    // y para que se agrupen juntos hay que garantizar el mismo día
    let dateAsObject = new Date(date)
    return dateAsObject.getTime();
  }
}

export default withHighcharts(App, Highcharts);
