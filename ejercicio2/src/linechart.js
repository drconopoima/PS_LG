import React from 'react';
import {
  HighchartsChart, withHighcharts, Title, Subtitle, XAxis, YAxis, Legend, Tooltip, Loading
} from 'react-jsx-highcharts';
import Highcharts from 'highcharts';

/**
 * [LineChart Component to load and display a Highcharts LineSeries Chart]
 * @param       {[Object Javascript]} plotOptions      [Options for configuration of the chart with Highcharts configuration values]
 * @param       {[Array]} renderSeries     [Chart Data]
 * @param       {[boolean]} loaded           [Indicates whether data have been fetched]
 * @param       {[string]} titleProp        [Chart Title]
 * @param       {[string]} subtitleProp     [Chart Subtitle]
 * @param       {[string]} xAxisProp     [Label for the X Axis]
 * @param       {[string]} yAxisProp     [Label for the X Axis]
 * @param       {[string]} loadingMsg    [Message to show while loading]
 * @exports     {[React Component]} LineChart [Component that loads a Highcharts LineSeries Chart]
 */
const LineChart = ({plotOptions, renderSeries, loaded, titleProp, subtitleProp, xAxisProp, yAxisProp, loadingMsg}) => {
    return (
      <div className="linechart">
        <HighchartsChart plotOptions={plotOptions}>
          <Title>{titleProp}</Title>

          <Subtitle>{subtitleProp}</Subtitle>

          <Loading isLoading={loaded}>{loadingMsg}</Loading>

          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <Tooltip shared />

          <XAxis type="datetime">
            <XAxis.Title>{xAxisProp}</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>{yAxisProp}</YAxis.Title>
            {renderSeries}
          </YAxis>
        </HighchartsChart>
      </div>
    )
}

export default withHighcharts(LineChart, Highcharts);
