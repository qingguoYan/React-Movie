import React, { Component } from "react";

class Heart extends Component {
  changeHeart = () => {
    return this.props.isLike ? "fa fa-heart" : "fa fa-heart-o";
  };
  render() {
    return (
      <div>
        <i
          className={this.changeHeart()}
          onClick={this.props.onHeart}
          aria-hidden="true"
        />
      </div>
    );
  }
}

export default Heart;
