import React, { Component } from "react";
import Heart from "./heart";
import { Link } from "react-router-dom";

class TableBody extends Component {
  render() {
    const { movies, onHandleHeart, onDelete } = this.props;
    return (
      <tbody>
        {movies.map(movie => {
          return (
            <tr key={movie._id}>
              <td>
                <Link to={`/moviesForm/${movie._id}`}>{movie.title}</Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Heart
                  isLike={movie.isLike}
                  onHeart={() => onHandleHeart(movie)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
