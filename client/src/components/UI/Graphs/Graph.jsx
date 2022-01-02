import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Plot from 'react-plotly.js';

const GraphContainer = () => {
  const [graphJson, setGraphJson] = useState('');
  const url = 'http://111.67.218.43:5000/get_graph1_json';

  useEffect(() => {
    const getGraphJson = async () => {
      const response = await axios.get(url);
      setGraphJson(response.data);
    };
    getGraphJson();
  }, []);
  console.log(graphJson);
  return (
    <div>
      <Plot data={graphJson.data} layout={graphJson.layout} />
    </div>
  );
};

export default GraphContainer;
