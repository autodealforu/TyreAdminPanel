import React from "react";

function Filters({
  q,
  resetFilter,
  setTerm,
  term,
  filterClicked,
  termField,
  setTermField,
  all_terms,
}) {
  return (
    <div>
      {/* <div className="row">
        <div className="col-md-6">
          <div>
            <div className="d-flex">
              <div>
                <i className="fa fa-filter" /> Active Filters
              </div>
              {q && (
                <div
                  style={{
                    border: "1px solid rgba(253,98,94,.25)",
                    margin: "0px 10px",
                    padding: "5px 5px",
                    color: "rgba(253,98,94,1)",
                    backgroundColor: "#f1f1f1",
                  }}
                >
                  Search Term:
                  <label style={{ paddingRight: "10px" }}>{q}</label>
                  <button
                    className="btn-sm btn-close"
                    onClick={() => resetFilter()}
                    style={{
                      fontSize: "12px",
                      color: "rgba(253,98,94,1)",
                    }}
                  >
                    <i
                      className="fa fa-close"
                      style={{
                        fontSize: "12px",
                        color: "rgba(253,98,94,1)",
                      }}
                    ></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex ">
            <div style={{ padding: "0px 10px" }}>
              <label>
                Select
                <select
                  onChange={(e) => setTermField(e.target.value)}
                  className="form-control"
                  value={termField}
                >
                  {all_terms &&
                    all_terms.map((item) => {
                      return <option value={item}>{item} </option>;
                    })}
                </select>
              </label>
            </div>
            <div>
              <label>
                Search
                <input
                  type="text"
                  className="form-control "
                  onChange={(e) => setTerm(e.target.value)}
                  value={term}
                />
              </label>
            </div>
            <div style={{ padding: "22px 10px" }}>
              <button
                className="btn btn-soft-light"
                onClick={() => filterClicked()}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Filters;
