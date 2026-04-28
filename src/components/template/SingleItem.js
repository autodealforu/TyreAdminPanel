import React from "react";

export default function SingleItem({ children, title, value }) {
  return (
    <>
      <div className="col-md-6">
        <div
          style={{
            borderBottom: "1px solid #f1f1f1",
            paddingBottom: "5px",
            paddingTop: "5px",
          }}
        >
          <div className="title"> {title} </div>
          <div
            style={{ marginBottom: "10px", fontWeight: 500, fontSize: "16px" }}
          >
            {" "}
            {children ? children : "-"}{" "}
          </div>
        </div>
      </div>
    </>
  );
}
