import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchGraph = (endPoint: string) => {
  const [state, setState] = useState<any>('');
  useEffect(() => {
    async function fetchGraph() {
      const url = `http://111.67.218.43:5000/data/${endPoint}`;
      const response = await axios.get(url);
      setState(response.data);
    }
    fetchGraph();
  }, []);
  return state;
};
