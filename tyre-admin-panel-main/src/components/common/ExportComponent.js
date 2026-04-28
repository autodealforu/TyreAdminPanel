import React from "react";

function ExportComponent({ handleOnExport }) {
  return (
    <div className="container-fluid">
      <div className="m-1" style={{ textAlign: "right" }}>
        <button className="btn btn-success" onClick={handleOnExport}>
          {" "}
          <i className="fa fa-download"></i>
          Export Data{" "}
        </button>
      </div>
    </div>
  );
}

export default ExportComponent;
