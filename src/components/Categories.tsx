import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: any;
}

const Categories: React.FC<CategoriesProps> = (props) => {
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