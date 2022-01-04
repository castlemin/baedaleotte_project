import { useFetchGraph } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const RankGraph = () => {
  const rankJson = useFetchGraph('get_risk_rank');
  return <Plot data={rankJson.data} layout={rankJson.layout} />;
};
