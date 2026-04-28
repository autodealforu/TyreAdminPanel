import React from "react";
import { Link } from "react-router-dom";

function TableEditBtn({ id, item }) {
  return (
    <Link to={`/${item}/${id}/edit`} className="btn btn-soft-light">
      <i className="fa fa-edit"></i>
    </Link>
  );
}

export default TableEditBtn;
