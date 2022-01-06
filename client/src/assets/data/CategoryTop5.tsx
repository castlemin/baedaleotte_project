import { useEffect, useState } from 'react';
import axios from 'axios';

export const CategoryTop5 = () => {
  const [topCategory, setTopCategory] = useState('');
  const url = 'http://111.67.218.43:5000/data/categorytop5';

  useEffect(() => {
    const fetchTopCategory = async () => {
      const response = await axios.get(url);
      setTopCategory(response.data);
    };
    fetchTopCategory();
  }, []);

  return <span>{topCategory}</span>;
};
