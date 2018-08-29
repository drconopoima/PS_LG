import React from 'react';
import {
  HighchartsChart, withHighcharts, Title, Subtitle, XAxis, YAxis, Legend, Tooltip, Loading
} from 'react-jsx-highcharts';
import Highcharts from 'highcharts';

/**
 ESPAÑOL:
 Componente LineChart para cargar y mostrar un gráfico del tipo lineal de Highcharts]
 * @param {[Object Javascript]} plotOptions         [Opciones para la configuración del gráfico con valores de configuración de React-JSX-Highcharts]
 * @param       {[Array]} renderSeries              [Datos a graficar]
 * @param       {[boolean]} loaded                  [Indica si se han obtenido los datos (carga async)]
 * @param       {[string]} titleLabel               [Titulo del gráfico]
 * @param       {[cadena]} yAxisLabel               [Etiqueta para los valores]
 * @param       {[string]} loadingMsg               [Mensaje a mostrar durante la carga]
 * @export      {[React Component]} PieChart        [Componente que carga un grafico lineal de Highcharts]
 ENGLISH:
 * [LineChart Component to load and display a Highcharts Line Chart]
 * @param       {[Object Javascript]} plotOptions   [Options for configuration of the chart with Highcharts configuration values]
 * @param       {[Array]}   renderSeries            [Chart Data]
 * @param       {[boolean]} loaded                  [Indicates whether data have been fetched (async load)]
 * @param       {[string]}  titleLabel              [Chart Title]
 * @param       {[string]}  subtitleLabel           [Chart Subtitle]
 * @param       {[string]}  xAxisLabel              [Label for the X Axis]
 * @param       {[string]}  yAxisLabel              [Label for the X Axis]
 * @param       {[string]}  loadingMsg              [Message to show while loading]
 * @exports     {[React Component]} LineChart       [Component that loads a Highcharts Line Chart]
 */
const LineChart = ({plotOptions, renderSeries, loaded, titleLabel, subtitleLabel, xAxisLabel, yAxisLabel, loadingMsg}) => {
    return (
      <div className="linechart">
        <HighchartsChart plotOptions={plotOptions}>
          <Title>{titleLabel}</Title>

          <Subtitle>{subtitleLabel}</Subtitle>

          <Loading isLoading={loaded}>{loadingMsg}</Loading>

          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <Tooltip shared />

          <XAxis type="datetime">
            <XAxis.Title>{xAxisLabel}</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>{yAxisLabel}</YAxis.Title>
            {renderSeries}
          </YAxis>
        </HighchartsChart>
      </div>
    )
}

export default withHighcharts(LineChart, Highcharts);
