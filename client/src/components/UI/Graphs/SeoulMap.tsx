import { useFetchJson } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const SeoulMap = () => {
  const seoulMapJson = useFetchJson('get_seoul_risk_map_all');
  return <Plot data={seoulMapJson.data} layout={seoulMapJson.layout} />;
};
