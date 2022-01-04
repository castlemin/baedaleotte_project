import { useFetchGraph } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const ConfirmedGraph = () => {
  const confirmJson = useFetchGraph('get_coronic_all');
  return <Plot data={confirmJson.data} layout={confirmJson.layout} />;
};
