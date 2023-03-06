import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    title: string;
    price: number;
    imageUrl: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza()  {
      try {
        const { data } = await axios.get('https://63e4c1e08e1ed4ccf6e54873.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }
    

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>
  }
  

  return (
    <div className="container">
        <img src={pizza.imageUrl} alt="pizza" />
        <h2>{pizza.title}</h2>
        <p></p>
        <h4>{pizza.price} ₽</h4>
        <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
        </Link>
    </div>
  )
}

export default FullPizza;