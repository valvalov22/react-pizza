import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';

const Pagination = (props) => {
  return (
    <ReactPaginate
        className={classes.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={e => props.onPageChange(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={props.currentPage - 1}
        renderOnZeroPageCount={null}
    />
  )
}

export default Pagination