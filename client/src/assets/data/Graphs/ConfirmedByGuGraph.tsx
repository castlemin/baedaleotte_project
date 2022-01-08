import { useFetchGraph } from '../../../hooks/useFetchJson';
import { useRecoilValue } from 'recoil';
import { userGu } from '../../../store/store';
import Plot from 'react-plotly.js';

export const ConfirmedByGuGraph = () => {
  const userDistrict = useRecoilValue(userGu);
  const confirmByGuJson = useFetchGraph(`coronic_gu?region=${userDistrict}`);
  return <Plot data={confirmByGuJson.data} layout={confirmByGuJson.layout} />;
};
