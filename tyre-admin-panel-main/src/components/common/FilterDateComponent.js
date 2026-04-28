import moment from "moment";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UseFilter } from "../../shared/hooks/UseFilter";
import { useHistory } from "react-router-dom";
import * as qs from "qs";
import { useEffect } from "react";
function FilterDateComponent({ link, showOwn, searchParams }) {
  const [activeBtn, todayDate, weekStartDate, weekEndsDate] = UseFilter();
  console.log(window.location.search);
  const [customDataSelected, setCustomDataSelected] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  let history = useHistory();

  const filterData = ({ fromDate, toDate }) => {
    if (fromDate && toDate) {
      console.log("DATA TO BE CHECKED", fromDate, toDate);
      history.push(
        `${link}?custom=true&conditional[createdAt][$gte]=${moment(
          fromDate
        ).format("YYYY-MM-DD")}&conditional[createdAt][$lte]=${moment(
          toDate
        ).format("YYYY-MM-DD")}`
      );
      setCustomDataSelected(false);
    }
  };
  const [dateConditions, setDateConditions] = useState(null);
  useEffect(() => {
    const queryParams = qs.parse(window.location.search.replace("?", ""));
    console.log(queryParams);
    if (queryParams.conditional && queryParams.conditional.createdAt) {
      setDateConditions(queryParams.conditional.createdAt);
    } else {
      setDateConditions(null);
    }
  }, [window.location.search]);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              Date Filter <br />
              <Link className="btn btn-sm btn-danger" to={link}>
                {" "}
                Clear{" "}
              </Link>
              {dateConditions && dateConditions["$gte"] && (
                <label className="badge  bg-warning m-1">
                  Created At {">"}{" "}
                  {moment(dateConditions["$gte"]).format("DD-MMM-YYYY")}{" "}
                </label>
              )}
              {dateConditions && dateConditions["$lte"] && (
                <label className="badge bg-warning">
                  Created At {"<"}{" "}
                  {moment(dateConditions["$lte"]).format("DD-MMM-YYYY")}{" "}
                </label>
              )}
            </div>
            {customDataSelected ? (
              <div className="d-flex justify-content-between align-items-end">
                <div>
                  {" "}
                  <label> From </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <label> To </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className={
                      activeBtn == "Custom"
                        ? "btn btn-success m-1"
                        : "btn btn-secondary m-1"
                    }
                    onClick={() =>
                      filterData({ fromDate: fromDate, toDate: toDate })
                    }
                  >
                    Apply
                  </button>
                  <button
                    className={"btn btn-danger m-1"}
                    onClick={() => {
                      setCustomDataSelected(false);
                      setFromDate("");
                      setToDate("");
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <div>
                  <Link
                    to={`${link}?today=true&conditional[createdAt][$gte]=${moment(
                      todayDate
                    ).format("YYYY-MM-DD")}`}
                    className={
                      activeBtn == "Today"
                        ? "btn btn-success m-1"
                        : "btn btn-secondary m-1"
                    }
                  >
                    {" "}
                    Today{" "}
                  </Link>
                  <Link
                    to={`${link}?weekly=true&conditional[createdAt][$gte]=${moment(
                      weekStartDate
                    ).format(
                      "YYYY-MM-DD"
                    )}&conditional[createdAt][$lte]=${moment(
                      weekEndsDate
                    ).format("YYYY-MM-DD")}`}
                    className={
                      activeBtn == "Weekly"
                        ? "btn btn-success m-1"
                        : "btn btn-secondary m-1"
                    }
                  >
                    {" "}
                    This Week{" "}
                  </Link>
                  <Link
                    to={`${link}?monthly=true&conditional[createdAt][$gte]=${moment()
                      .startOf("month")
                      .format(
                        "YYYY-MM-DD"
                      )}&conditional[createdAt][$lte]=${moment()
                      .endOf("month")
                      .format("YYYY-MM-DD")}`}
                    className={
                      activeBtn == "Monthly"
                        ? "btn btn-success m-1"
                        : "btn btn-secondary m-1"
                    }
                  >
                    {" "}
                    This Month{" "}
                  </Link>
                  <button
                    className={
                      activeBtn == "Custom"
                        ? "btn btn-success m-1"
                        : "btn btn-secondary m-1"
                    }
                    onClick={() => setCustomDataSelected(true)}
                  >
                    Custom
                  </button>
                  <Link
                    to={`${link}`}
                    className={
                      activeBtn == "Lifetime"
                        ? "btn btn-success m-1"
                        : "btn btn-secondary m-1"
                    }
                  >
                    Lifetime
                  </Link>
                  {showOwn && searchParams && (
                    <Link
                      to={`${link}${
                        window.location.search ? window.location.search : "?"
                      }&exact[${searchParams.term}]=${searchParams.value}`}
                      className={"btn btn-secondary m-1"}
                    >
                      My Activity
                    </Link>
                  )}
                </div>
                <div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterDateComponent;
