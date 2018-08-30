import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Highcharts from 'highcharts';
import { withHighcharts, LineSeries, PieSeries } from 'react-jsx-highcharts';
import _ from 'lodash';
import LineChart from './linechart';
import PieChart from './piechart';

/**
 * [dataParsing: Array para generalizar la limpieza y obtención de los datos]
 * @type {Array con Objectos}
 * Se compone de un objeto por cada archivo Json a recibir
 * Propiedades de los objetos:
 * 'url': El link de donde buscar el json
 * 'date': Objeto con los datos para obtener la fecha
 *    * 'key': Clave del json que almacena la fecha
 *    * 'format': Formato de la fecha, puede ser 'YYYY-MM-DD' o 'milliseconds'
 * 'cat': Objeto con los datos para obtener la categoría
 *    * 'key': Clave del json que almacena la categoría
 * 'value': Objeto con los datos para obtener el valor
 *    * 'key': Clave del json que almacena el valor
 * Todas las claves tienen una propiedad 'raw' que almacena información requerida para limpiar si hay datos que necesiten ser procesados
 *    * 'raw': Objeto con información requerida para limpiar la fecha si esta se almacena en datos sin procesar
 *    *       * 'isRaw': Boolean. True si la fecha está en datos sin procesar, de otro modo false
 *    *       * 'rawKey': Clave del json donde se almacenan datos sin procesar
 *    *       * 'regex': Expresión Regular para obtener la fecha de los datos
 *    *       * 'replaceRegex': Expresión regular para reemplazar algunos parámetros usados para aislar la variable de la data sin procesar
 */
let dataParsing = [
  {
    'url': 'https://s3.amazonaws.com/logtrust-static/test/test/data1.json',
    'date': {
        'key': 'd',
        'format': 'milliseconds',
        'raw': {
          'isRaw': false
        }
      },
      'cat': {
      'key': 'cat',
      'raw': {
        'isRaw': false
      }
    },
    'value': {
      'key': 'value',
      'raw': {
        'isRaw': false
      }
    }
  },
  {
    'url': 'https://s3.amazonaws.com/logtrust-static/test/test/data2.json',
    'date': {
        'key': 'myDate',
        'format': 'YYYY-MM-DD',
        'raw': {
          'isRaw': false,
        }
    },
    'cat': {
      'key': 'categ',
      'raw': {
        'isRaw': false
      }
    },
    'value': {
      'key': 'val',
      'raw': {
        'isRaw': false
      }
    }
  },
  {
    'url': 'https://s3.amazonaws.com/logtrust-static/test/test/data3.json',
    'date': {
        'key': undefined,
        'format': 'YYYY-MM-DD',
        'raw': {
          'isRaw': true,
          'rawKey': 'raw',
          'regex': /[0-9]{3}[1-9]{1}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))+/g,
          /* Regex que busca una fecha formato YYYY-MM-DD (dias y mes con ceros al comienzo). Fuente: Johan Södercrantz at RegexLib
           * http://regexlib.com/DisplayPatterns.aspx?cattabindex=4&categoryId=5&AspxAutoDetectCookieSupport=1
           * Modificado ligeramente para evitar el año 0000 (no existio, el año anterior al 0001 DC fue el 0001 AC)
           * También quité el "^" y el "$" para evitar que sólo compare con todo el string desde el comienzo (^) hasta el final ($),
          */
          'replaceRegex': /()/g
          // Regex vacio, porque con el regex de fecha usado no es necesario reemplazar simbolos para aislar la variable
        }
    },
    'cat': {
      'key': undefined,
      'raw': {
        'isRaw': true,
        'rawKey': 'raw',
        'regex': /(#[C]{1}[A]{1}[T]{1} [1234]{1}#)+/g,
        // Regex que busca una categoría entre simbolos de numeral "#".
        'replaceRegex': /(#)/g
        // Regex para reemplazar los numerales (que necesariamente devuelve el regex anterior)
      }
    },
    'value': {
      'key': 'val',
      'raw': {
        'isRaw': false
      }
    }
  }
];

const plotOptions = {
  line: {
    marker: {
      enabled: false
    }
  }
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      rawData: [],
      data1: {}, // Raw data fetched from data1
      data2: {}, // Raw data fetched from data2
      data3: {}, // Raw data fetched from data3
      consolidatedData: false, // When finishes fetching all data doesn't attempt to consolidate again
      cleanedDataForCharts: {},  // Conjunto de datos organizados en primer nivel por categoría y en segundo nivel por fecha
      /* cleanedDataForCharts: {
       *     'CAT 1': { 'dateMilliseconds': Value } ...
       * ... 'CAT N': { 'dateMilliseconds': Value }
       * } */
      lineChartDataArray: {  // Conjuntos de datos para pasar al componente LineSeries
        /* cleanedDataForCharts: {
         *     'CAT 1': [[dateMilliseconds01,Value01], ... [dateMillisecondsM1,ValueM1]], ...
         * ... 'CAT N': [[dateMilliseconds0N,Value0N], ... [dateMillisecondsMN,ValueMN]]
         * } */
      },
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
    /* De acuerdo al lifecycle de React, se monta el componente primero y luego
     * se hace el fetch con AJAX de la data, para que el usuario vea los gráficos como
     * "cargando...". Por lo tanto, se ejecuta en Component Did Mount
    */
    let allPromises = [];
    let categoryTotals = {};
    let cleanedDataForCharts = {};
    let lineChartDataArray = {};
    // Crear una promesa por cada Json que haya que recibir
    Object.values(dataParsing).forEach((objectValue, index) => {
      allPromises.push(fetch(dataParsing[index]['url'])
      .then(response => response.json()));
    })
    // Cuando se resuelvan todas las promesas, hay que hacer el escaneo y arreglar la data
    Promise.all(allPromises)
      .then(allResponses => {
        this.setState({rawData: allResponses});
        // Guardar la data en forma limpia en claves 'data#' del estado de la App
        allResponses.forEach((eachResponse, index) => {
          let category, value, date;
          for (let elementData of eachResponse) {
            /*
             * FORMATEO DE CATEGORIA
            */
            // Si la categoria está en los datos sin formatear, debe formatearse primero
            if (dataParsing[index]['cat']['raw']['isRaw']) {
              let regexCAT = dataParsing[index]['cat']['raw']['regex'];
              category = elementData[dataParsing[index]['cat']['raw']['rawKey']].match(regexCAT)[0].replace(dataParsing[index]['cat']['raw']['replaceRegex'],'');
            } else{
              // categoria del elemento actual
              category = elementData[dataParsing[index]['cat']['key']].toUpperCase();
            }
            /*
             * FORMATEO DE FECHA
            */
            // Si la fecha está en los datos sin formatear, debe formatearse primero
            if (dataParsing[index]['date']['raw']['isRaw']) {
              let regexDate = dataParsing[index]['date']['raw']['regex'];
              date = elementData[dataParsing[index]['date']['raw']['rawKey']].match(regexDate)[0].replace(dataParsing[index]['date']['raw']['replaceRegex'],'');
            } else {
              // fecha del elemento actual
              date = elementData[dataParsing[index]['date']['key']];
            }
            if (dataParsing[index]['date']['format']==='milliseconds') {
              // Fecha en milisegundos debe convertirse a YYYY-MM-DD y de nuevo a milisegundos para evitar que un mismo día tenga varios índices
              // Convertir a YYYY-MM-DD para combinar todas las horas del dia en la misma fecha
              date = this.formatDateReadable(new Date(date));
              // Convertir de vuelta a milisegundos
              date = new Date(date);
              date = date.getTime();
            } else if (dataParsing[index]['date']['format']==='YYYY-MM-DD') {
              // Fecha en YYYY-MM-DD debe convertirse a milisegundos
              date = new Date(date);
              date = date.getTime();
            }
            /*
             * FORMATEO DE VALOR
            */
            // Si el valor está en los datos sin formatear, debe formatearse primero
            if (dataParsing[index]['value']['raw']['isRaw']) {
              let regexValue = dataParsing[index]['value']['raw']['regex'];
              value = Number(elementData[dataParsing[index]['value']['raw']['rawKey']].match(regexValue)[0].replace(dataParsing[index]['value']['raw']['replaceRegex'],''));
            } else{
              // Valor del elemento actual
              value = Number(elementData[dataParsing[index]['value']['key']]);
            }
            /*
             * TRASFORMAR DATOS EN ESTRUCTURA LIMPIA
            */
            // Agregar la categoría a las estructuras si esta es nueva (este modo permite generalizar N categorias)
            if (!(category in categoryTotals)){
              categoryTotals[category] = value;
              cleanedDataForCharts[category] = {};
            } else { // si la categoría ya esta presente, continuar agregando valores
              categoryTotals[category] += value;
            }
            // si la categoría ya esta presente, continuar agregando fechas y valores
            if (!(date in cleanedDataForCharts[category])) {
              cleanedDataForCharts[category][date] = value;
            } else {
              cleanedDataForCharts[category][date] += value;
            }
          }
        })
        this.setState({cleanedDataForCharts: cleanedDataForCharts});
        this.setState({categoryTotals: categoryTotals});
        Object.keys(categoryTotals).forEach((key) => {
          let sortedDates = cleanedDataForCharts[key];
          lineChartDataArray[key] = Object.keys(sortedDates).map((data) => {
            return [Number(data),cleanedDataForCharts[key][data]];
          })
          lineChartDataArray[key].sort();
        });
        this.setState({lineChartDataArray: lineChartDataArray});
        this.setState({consolidatedData: true});
      })
    }
  renderLineSeries(keysAndDataPoints) {
    console.log(keysAndDataPoints);
    return (
      Object.keys(keysAndDataPoints).map((key) => {
        return (
            <LineSeries data={keysAndDataPoints[key]} name={key} key={_.uniqueId()} />
          )
      })
    )
  }
  renderPieChart (aggregatedValues,chartName) {
    let pieData = Object.keys(aggregatedValues).map(key => {
      return [key, aggregatedValues[key]];
    })
    return (
      <PieSeries data={pieData} name={chartName} key={_.uniqueId()} />
    )
  }
  render() {
    let { lineChartDataArray, consolidatedData, categoryTotals } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Panel de resultados del Ejercicio 2 de Devo</h1>
        </header>
        <div>
            <LineChart
              plotOptions={plotOptions}
              renderSeries={this.renderLineSeries(lineChartDataArray)}
              loaded={!consolidatedData}
              titleLabel="Valores por categoría en el tiempo"
              subtitleLabel="Tasa de cambio del valor de cada categoría"
              xAxisLabel="Fecha"
              yAxisLabel="Valor"
              loadingMsg="Cargando..." />
            <PieChart
              titleLabel="Totales para cada categoría"
              loaded={!consolidatedData}
              renderSeries={this.renderPieChart(categoryTotals)}
              loadingMsg="Cargando..."
              axisLabel="Total" />

          </div>
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
}

export default withHighcharts(App, Highcharts);
