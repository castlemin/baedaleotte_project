import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchJson = (endPoint: string) => {
  const [state, setState] = useState<any>('');
  useEffect(() => {
    async function fetchData() {
      const url = `http://111.67.218.43:5000/data/${endPoint}`;
      const response = await axios.get(url);
      setState(response.data);
    }
    fetchData();
  }, []);
  console.log(state);
  return state;
};
