import React, { Component } from "react";
import TableHeart from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title"
    },
    {
      path: "genre.name",
      label: "Genre"
    },
    {
      path: "numberInStock",
      label: "Stock"
    },
    {
      path: "dailyRentalRate",
      label: "Rate"
    },
    { key: "isLike" },
    { key: "delete" }
  ];
  render() {
    const {
      filtered,
      movies,
      onHandleHeart,
      onDelete,
      sortColumn,
      onSort
    } = this.props;
    return (
      <div>
        {filtered.length === 0 ? (
          "no data"
        ) : (
          <table className="table">
            <TableHeart
              columns={this.columns}
              sortColumn={sortColumn}
              onSort={onSort}
            />
            <TableBody
              movies={movies}
              onHandleHeart={onHandleHeart}
              onDelete={onDelete}
            />
          </table>
        )}
      </div>
    );
  }
}

export default MoviesTable;
