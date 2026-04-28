import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pace-done">
      <div className="text-center" style={{ padding: "50px 0px" }}>
        <h1> 404 </h1>
        <h3> Page Not Found </h3>
        <Link className="btn btn-primary" to="/dashboard">
          GO TO DASHBOARD
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
