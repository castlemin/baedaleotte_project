import { useFetchJson } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const GuMap = () => {
  const guMapJson = useFetchJson('get_seoul_risk_map/gps');
  return <Plot data={guMapJson.data} layout={guMapJson.layout} />;
};
