import React, { Component } from "react";
import propTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  render() {
    //接受的东西已经准备好，接下来需要用这些东西做事情
    const { itemsCount, pageSize, currentPage, onChangePage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => onChangePage(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onChangePage: propTypes.func.isRequired
};

export default Pagination;
