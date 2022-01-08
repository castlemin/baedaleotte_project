import { useFetchGraph } from '../../../hooks/useFetchJson';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userGu, CoronicNumberByGu } from '../../../store/store';
import Plot from 'react-plotly.js';

export const ConfirmedByGuGraph = () => {
  const userDistrict = useRecoilValue(userGu);
  const confirmByGuJson = useFetchGraph(`coronic_gu?region=${userDistrict}`);

  // const currentCoronic =
  //   confirmByGuJson.data[0].text[confirmByGuJson.data[0].text.length - 1];
  // const addedCoronic =
  //   confirmByGuJson.data[1].text[confirmByGuJson.data[1].text.length - 1];

  // setCoronicGuNum((prev) => [...prev, currentCoronic, addedCoronic]);
  // console.log(coronicGuNum);

  return <Plot data={confirmByGuJson.data} layout={confirmByGuJson.layout} />;
};
