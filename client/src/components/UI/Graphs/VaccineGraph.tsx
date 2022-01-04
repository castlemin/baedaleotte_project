import { useFetchJson } from '../../../hooks/useFetchJson';
import Plot from 'react-plotly.js';

export const VaccinGraph = () => {
  const vaccineJson = useFetchJson('get_vac');
  return <Plot data={vaccineJson.data} layout={vaccineJson.layout} />;
};
