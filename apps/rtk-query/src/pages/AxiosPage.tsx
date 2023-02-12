import { useState, useEffect } from 'react';
import axios from "axios";

import { HeroType } from '../interfaces';

export const AxiosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://api.com/heroes').then((res) => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [])
  if(isLoading) return <h2>Loading...</h2>
  return (
    <>
      <h2>Axios Page</h2>
      <hr />
      {
        data.map( (h: HeroType) => {
          return <div key={h.name}>{h.name}</div>
        })
      }
    </>
  )
}
