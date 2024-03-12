// Fetch.jsx
import React, { useState, useEffect } from 'react';

const Fetch = ({ url, method = 'GET', body = null, headers = {} }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let response = null;
      switch (method) {
        case 'GET':
          response = await fetch(url);
          break;
        case 'POST':
          response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: body
          });
          break;
        // Aquí puedes agregar otros casos para PUT y DELETE si los necesitas
        default:
          break;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
        fetchData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, method, body, headers]);

  // Devolver los datos, error, estado de carga y función createRoom
  return { data, error, loading, createRoom: fetchData };
};

export default Fetch;