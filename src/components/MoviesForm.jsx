import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MoviesForm extends Form {
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-fonud");
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };
  schema = {
    _id: Joi.string().label("id"),
    title: Joi.string()
      .required()
      .label("title"),
    genreId: Joi.string()
      .required()
      .label("genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("rate")
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  doSubmit = () => {
    const m = saveMovie(this.state.data);
    if (m) {
      const { history } = this.props;
      history.push("/movies");
    }
  };
  render() {
    return (
      <div>
        <h1>MovieForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "title")}
          {this.renderInput("genreId", "genreId")}
          {this.renderInput("numberInStock", "stock")}
          {this.renderInput("dailyRentalRate", "rate")}
          {this.renderButton("save")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
