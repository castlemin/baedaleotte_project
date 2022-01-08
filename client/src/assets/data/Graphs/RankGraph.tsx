import { useFetchGraph } from '../../../hooks/useFetchJson';
import { useRecoilValue } from 'recoil';
import { userGu } from '../../../store/store';
import Plot from 'react-plotly.js';

export const RankGraph = () => {
  const userDistrict = useRecoilValue(userGu);
  const rankJson = useFetchGraph(`risk_rank?region=${userDistrict}`);
  return <Plot data={rankJson.data} layout={rankJson.layout} />;
};
