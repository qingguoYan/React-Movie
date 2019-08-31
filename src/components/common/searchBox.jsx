import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      aria-label="Search"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      aria-describedby="basic-addon1"
    ></input>
  );
};
export default SearchBox;
