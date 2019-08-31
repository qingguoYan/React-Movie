import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    //分页需要的参数
    const { itemsCount, pageSize, currentPage, onSelectPage } = this.props;
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
              <p className="page-link" onClick={() => onSelectPage(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
