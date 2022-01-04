import { useFetchJson } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const ConfirmedGraph = () => {
  const confirmJson = useFetchJson('get_coronic_all');
  return <Plot data={confirmJson.data} layout={confirmJson.layout} />;
};
