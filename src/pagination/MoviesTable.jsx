import React, { Component } from "react";
import Heart from "./common/heart";

class MoviesTable extends Component {
  render() {
    const { movies, onSortMovies } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => onSortMovies("title")}>Title</th>
              <th onClick={() => onSortMovies("genre.name")}>Genre</th>
              <th onClick={() => onSortMovies("numberInStock")}>Stock</th>
              <th onClick={() => onSortMovies("dailyRentalRate")}>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map(m => {
              return (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                  <td>
                    <Heart
                      movie={m}
                      onChangeHeart={() => this.props.onHandleChangeHeart(m)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.props.onDeleteMovie(m)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MoviesTable;
