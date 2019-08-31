import React, { Component } from "react";

class Heart extends Component {
  changeColor = () => {
    return this.props.movie.isLike ? "fa fa-heart" : "fa fa-heart-o";
  };
  render() {
    return (
      <i
        aria-hidden="true"
        className={this.changeColor()}
        onClick={this.props.onChangeHeart}
      ></i>
    );
  }
}

export default Heart;
