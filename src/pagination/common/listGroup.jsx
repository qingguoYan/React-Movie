import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const {
      items,
      onItemSelected,
      selectItem,
      textProperty,
      valueProperty
    } = this.props;
    return (
      <ul className="list-group">
        {items.map(item => (
          <li
            className={
              selectItem === item ? "list-group-item active" : "list-group-item"
            }
            key={item[valueProperty]}
            onClick={() => onItemSelected(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
