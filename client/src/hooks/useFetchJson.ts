import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchGraph = (endPoint: string) => {
  const [state, setState] = useState<any>('');
  useEffect(() => {
    async function fetchGraph() {
      const url = `https://a4f6d6aa-7694-4185-b2c9-534ac61ec028.mock.pstmn.io/data/${endPoint}`;
      const response = await axios.get(url);
      setState(response.data);
    }
    fetchGraph();
  }, []);
  return state;
};
