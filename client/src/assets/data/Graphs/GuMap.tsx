import { useFetchGraph } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const GuMap = () => {
  const guMapJson = useFetchGraph('get_seoul_risk_map/gps');
  return <Plot data={guMapJson.data} layout={guMapJson.layout} />;
};
