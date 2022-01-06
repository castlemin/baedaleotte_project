import { useFetchGraph } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const SeoulMap = () => {
  const seoulMapJson = useFetchGraph('seoul_risk_map_all');
  return <Plot data={seoulMapJson.data} layout={seoulMapJson.layout} />;
};
