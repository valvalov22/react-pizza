import React, { useState } from 'react';

const Categories = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  }

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
        <ul>
          {
            categories.map((categoryName, index) => (
              <li key={index} onClick={() => props.onClickCategory(index)} className={props.value === index ? "active" : ""}>{categoryName}</li>
            ))
          }
        </ul>
    </div>
  )
}

export default Categories