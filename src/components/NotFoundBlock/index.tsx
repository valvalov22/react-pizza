import React from 'react';

import classes from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={classes.root}>
        <h1>
            <span>😔</span>
            <br />
            Ничего не найдено
        </h1>
        <p className={classes.description}>К сожалению данная страница отсуствует на нашем сайте</p>
    </div>  
  )
}

export default NotFoundBlock