import { useFetchJson } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const RankGraph = () => {
  const rankJson = useFetchJson('get_seoul_risk_map_all');
  return <Plot data={rankJson.data} layout={rankJson.layout} />;
};
