import Plot, { PlotParams } from 'react-plotly.js';

interface Props extends PlotParams {}

export const SeoulMap = ({ data, layout }: Props) => {
  return <Plot data={data} layout={layout} />;
};
