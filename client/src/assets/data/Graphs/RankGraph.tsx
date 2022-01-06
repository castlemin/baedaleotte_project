import { useFetchGraph } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const RankGraph = () => {
  const rankJson = useFetchGraph('risk_rank?region=용산구');
  return <Plot data={rankJson.data} layout={rankJson.layout} />;
};
