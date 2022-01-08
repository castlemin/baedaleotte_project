import { useFetchGraph } from '../../../hooks/useFetchJson';
import { useRecoilValue } from 'recoil';
import { userGu } from '../../../store/store';

import Plot from 'react-plotly.js';

export const GuMap = () => {
  const userDistrict = useRecoilValue(userGu);
  const guMapJson = useFetchGraph(`seoul_risk_map?region=${userDistrict}`);
  return <Plot data={guMapJson.data} layout={guMapJson.layout} />;
};
