import { useEffect, useState } from 'react';
import axios from 'axios';
import { CATEGORY_TOP_5 } from '../requestUrls';

export const CategoryTop5 = () => {
  const [topCategory, setTopCategory] = useState('');

  useEffect(() => {
    const fetchTopCategory = async () => {
      const response = await axios.get(CATEGORY_TOP_5);
      setTopCategory(response.data);
    };
    fetchTopCategory();
  }, []);

  return <span>{topCategory}</span>;
};
