import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/pagination";
import { pagination } from "../utils/pagination";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: "",
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const movies = [...getMovies()];
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({ movies, genres });
  }

  handleChangeHeart = (movie) => {
    const movies = [...getMovies()];
    const index = movies.indexOf(movie);
    movies[index].isLike = !movies[index].isLike;
    this.setState({ movies });
  };

  deleteMovie = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handleSelectPage = (page) => {
    this.setState({ currentPage: page });
  };

  handleSelectGenre = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSortMovies = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };
  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;
    if (allMovies.length === 0) return <p>There have zero data</p>;
    //数据分类123456
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre.name === selectedGenre.name)
        : allMovies;
    //排序
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    //只展示第currentPage页的数据
    const movies = pagination(sorted, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            onItemSelected={this.handleSelectGenre}
            selectItem={selectedGenre}
          />
        </div>
        <div className="col">
          <div className="container">
            <h3>There have {sorted.length} Movies in the database.</h3>
            <MoviesTable
              movies={movies}
              onHandleChangeHeart={this.handleChangeHeart}
              onDeleteMovie={this.deleteMovie}
              onSortMovies={this.handleSortMovies}
            />
            <Pagination
              itemsCount={sorted.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onSelectPage={this.handleSelectPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
