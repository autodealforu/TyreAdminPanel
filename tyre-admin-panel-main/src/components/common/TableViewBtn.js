import React from "react";
import { Link } from "react-router-dom";

function TableViewBtn({ id, item }) {
  return (
    <Link to={`/${item}/${id}/view`} className="btn btn-soft-light">
      <i className="fa fa-eye"></i>
    </Link>
  );
}

export default TableViewBtn;
