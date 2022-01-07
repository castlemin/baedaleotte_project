import { useFetchGraph } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const GuMap = () => {
  const guMapJson = useFetchGraph('seoul_risk_map?region=용산구');
  return <Plot data={guMapJson.data} layout={guMapJson.layout} />;
};
