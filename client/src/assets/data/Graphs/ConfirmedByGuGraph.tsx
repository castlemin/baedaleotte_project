import { useFetchGraph } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const ConfirmedByGuGraph = () => {
  const confirmByGuJson = useFetchGraph('get_coronic_gu');
  return <Plot data={confirmByGuJson.data} layout={confirmByGuJson.layout} />;
};
