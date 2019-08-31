import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { pagination } from "../utils/pagination";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectGenre: "",
      sortColumn: { path: "title", order: "asc" },
      searchWord: ""
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Geners" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }
  /**
   * delete movie
   */
  deleteMovieById = id => {
    deleteMovie(id);
    this.setState({ movies: getMovies() });
  };

  /**
   *change heart color
   */
  handleHeart = movie => {
    const movies = [...getMovies()];
    const index = movies.indexOf(movie);
    movies[index].isLike = !movies[index].isLike;
    this.setState({ movies });
  };

  /**
   * change page
   */
  handleChangePage = page => {
    this.setState({ currentPage: page });
  };

  /**
   * Genres movies
   */
  selectedGenres = Genre => {
    this.setState({ selectGenre: Genre, searchWord: "", currentPage: 1 });
  };

  /**
   * sort
   */
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  /**
   * handle input search
   */
  handleInputChange = query => {
    this.setState({ searchWord: query, selectGenre: "", currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectGenre,
      genres,
      sortColumn,
      searchWord
    } = this.state;
    let filtered = allMovies;
    if (searchWord) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchWord.toLowerCase())
      );
    } else {
      filtered =
        selectGenre && selectGenre._id
          ? allMovies.filter(m => m.genre._id === selectGenre._id)
          : allMovies;
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = pagination(sorted, currentPage, pageSize);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <div>
              <ListGroup
                onItemSelected={this.selectedGenres}
                selectItem={selectGenre}
                items={genres}
              />
            </div>
          </div>
          <div className="col">
            <div className="container">
              <Link to="/movies/new" className="btn btn-primary">
                New Movie
              </Link>
              <h3>There have {filtered.length} Movies in the database.</h3>
              <SearchBox value={searchWord} onChange={this.handleInputChange} />
              <MoviesTable
                filtered={filtered}
                movies={movies}
                onDelete={this.deleteMovieById}
                onHandleHeart={this.handleHeart}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                onChangePage={this.handleChangePage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
