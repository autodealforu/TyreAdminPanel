import React from "react";
import { Link } from "react-router-dom";

function AddBtn({ item, title }) {
  return (
    <div className="row">
      <div className="col-sm">
        <div className="mb-4">
          <Link
            type="button"
            to={`/${item}/add`}
            className="btn btn-light
                                  waves-effect waves-light"
          >
            <i className="fa fa-plus me-1" /> Add {title}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddBtn;
