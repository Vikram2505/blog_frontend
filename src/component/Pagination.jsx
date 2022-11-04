import React from 'react'
import ReactPaginate from 'react-paginate';


const Pagination = ({ pageCount, handlePageClick }) => {

  
  return (
    <>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="...."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        hrefAllControls
      // forcePage={pageCount}
      
      onClick={(clickEvent) => {
        // console.log('onClick', clickEvent);
       //return false //to prevent standard page change,
      // return false; // --> Will do nothing.
      // return //a number to choose the next page,
      // return 4; --> Will go to page 5 (index 4)
      // return nothing (undefined) to let standard behavior take place.
      }}
      />
    </>
  )
}

export default Pagination