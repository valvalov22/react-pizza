import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';

type PaginationProps = {
  onPageChange: any;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
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
    />
  )
}

export default Pagination