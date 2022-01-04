import { useFetchJson } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const ConfirmedByGuGraph = () => {
  const confirmByGuJson = useFetchJson('get_coronic_gu');
  return <Plot data={confirmByGuJson.data} layout={confirmByGuJson.layout} />;
};
