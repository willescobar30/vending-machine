import axios from "axios";
import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface ProductsProps {
  setWaiting: Dispatch<SetStateAction<IData2[]>>,
  waiting: IData2[],
}

interface IData {
  id: string,
  name: string,
  preparation_time: number,
  thumbnail: string,
}

interface IData2 {
  id: string,
  name: string,
  preparation_time: number,
  thumbnail: string,
  created_at: Date
}

const Products: FC<ProductsProps> = ({ setWaiting, waiting }) => {
  const [products, setProducts] = useState<IData[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`https://products-api-ten.vercel.app/api`);
        setProducts(data.data);

      } catch (e) {

      }
    }
    fetchData();
  }, []);

  const handleAddProduct = (id: string) => {
    const currentList = waiting
    const item_id = products.filter(item => item.id === id)[0].id;
    const item_name = products.filter(item => item.id === id)[0].name;
    const item_preparation_time = products.filter(item => item.id === id)[0].preparation_time;
    const item_thumbnail = products.filter(item => item.id === id)[0].thumbnail;
    currentList.push({
      id: item_id,
      name: item_name,
      preparation_time: item_preparation_time,
      thumbnail: item_thumbnail,
      created_at: new Date()
    })
  }
  if (products.length !== 0) {
    return (
      <div style={{ width: '100%' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th align="left" style={{ width: '10%' }}>Name</th>
              <th style={{ width: '40%' }}>Image</th>
              <th style={{ width: '40%' }}>Time</th>
              <th style={{ width: '10%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map(item => {
              return (
                <tr key={item.id}>
                  <td align="left">{item.name}</td>
                  <td><img src={item.thumbnail} alt={item.name} width="100px" height="100px" /></td>
                  <td>{item.preparation_time}</td>
                  <td>
                    <button onClick={() => handleAddProduct(item.id)}>+</button>
                  </td>
                </tr>

              );
            }
            )}
          </tbody>
        </table>

      </div>);
  } else {
    return <h1>Loading ...</h1>
  }
}

export default Products;