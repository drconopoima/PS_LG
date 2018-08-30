import React from 'react';
import {
  HighchartsChart, withHighcharts, Title, YAxis, Legend, Tooltip, Loading
} from 'react-jsx-highcharts';
import Highcharts from 'highcharts';

/**
 ESPAÑOL:
 Componente PieChart para cargar y mostrar un gráfico de Highcharts de tipo torta (circular o pie)]
 * @param     {[Array]} renderSeries                [Datos a graficar]
 * @param     {[boolean]} loaded                    [Indica si se han obtenido los datos (carga async)]
 * @param     {[string]} titleLabel                  [Titulo del gráfico]
 * @param     {[cadena]} axisLabel                   [Etiqueta para los valores]
 * @param     {[string]} loadingMsg                 [Mensaje a mostrar durante la carga]
 * @export    {[React Component]} PieChart          [Componente que carga un grafico de torta de Highcharts]
 ENGLISH:
 * [PieChart Component to load and display a Highcharts Pie Chart]
 * @param       {[Object Javascript]} plotOptions   [Options for configuration of the chart with React-JSX-Highcharts configuration values]
 * @param       {[Array]} renderSeries              [Chart Data]
 * @param       {[boolean]} loaded                  [Indicates whether data have been fetched (async load)]
 * @param       {[string]} titleLabel                [Chart Title]
 * @param       {[string]} axisLabel                [Label for chart values]
 * @param       {[string]} loadingMsg               [Message to show while loading]
 * @export      {[React Component]} PieChart        [Component that loads a Highcharts Pie Chart]
 */
const PieChart = ({renderSeries, loaded, titleLabel, subtitleLabel, axisLabel, loadingMsg}) => {
    return (
      <div className="linechart">
        <HighchartsChart>
          <Title>{titleLabel}</Title>

          <Loading isLoading={loaded}>{loadingMsg}</Loading>

          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <Tooltip shared />

          <YAxis>
            <YAxis.Title>{axisLabel}</YAxis.Title>
            {renderSeries}
          </YAxis>
        </HighchartsChart>
      </div>
    )
}

export default withHighcharts(PieChart, Highcharts);
