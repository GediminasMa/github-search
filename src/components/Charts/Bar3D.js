import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Bar3D = ({ data }) => {
  const chartConfigs = {
    type: 'bar3d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Forked',
        yAxisName: 'Forked',
        xAxisName: 'Repos',
        yAxisNameFontSize: '16px',
        xAxisNameFontSize: '16px',
      },
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Bar3D;
