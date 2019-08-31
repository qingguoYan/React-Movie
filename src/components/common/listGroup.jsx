import React from "react";

const ListGroup = props => {
  const {
    onItemSelected,
    selectItem,
    items,
    textProperty,
    valueProperty
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            item === selectItem ? "list-group-item active" : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => {
            onItemSelected(item);
          }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
