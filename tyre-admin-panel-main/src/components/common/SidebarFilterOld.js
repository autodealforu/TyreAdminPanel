import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import * as qs from "qs";
// import { Filter_title } from "../../shared/enums/candidates_enum";
function SidebarFilter({ SIDEBAR_OPTIONS, dropdown_options }) {
  const history = useHistory();
  const location = useLocation();
  const [selectedFields, setSelectedFields] = useState({});
  const [sidebarParams, setSidebarParams] = useState({});
  useEffect(() => {
    if (window.location.search) {
      setSelectedFields(getUrlParameters());
    }
  }, []);

  // const qs = require('qs');
  const query = qs.stringify(
    {
      sort: ["title:asc"],
      filters: {
        title: {
          $eq: "hello",
        },
      },
      populate: "*",
      fields: ["title"],
      pagination: {
        pageSize: 10,
        page: 1,
      },
      publicationState: "live",
      locale: ["en"],
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  const handleSidebarChange = (name, value, type) => {
    const queryParams = qs.parse(window.location.search.replace("?", ""));

    // if (value.length > 0) {
    //   urlParams.set(name, value);
    // } else {
    //   urlParams.delete(name);
    // }
    if (type) {
      if (type == "conditional") {
        console.log("CALLING");
        if (queryParams[type]) {
          if (queryParams[type][name]) {
            queryParams[type][name]["$gte"] = value;
          } else {
            queryParams[type][name] = {};
            queryParams[type][name]["$gte"] = value;
          }
        } else {
          queryParams[type] = {};
          queryParams[type][name] = {};
          queryParams[type][name]["$gte"] = value;
        }
      } else {
        if (queryParams[type]) {
          queryParams[type][name] = value;
        } else {
          queryParams[type] = {};
          queryParams[type][name] = value;
        }
      }
    } else {
      if (queryParams["search"]) {
        queryParams["search"][name] = value;
      } else {
        queryParams["search"] = {};
        queryParams["search"][name] = value;
      }
    }

    const query = qs.stringify(queryParams, {
      encodeValuesOnly: true, // prettify url
    });
    // console.log("PARAMS", params.toString());
    console.log("QUERY", `${location.pathname}?${query}`);
    history.push(`${location.pathname}?${query}`);
  };
  const getSidebarValue = (name) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(name);
  };

  const removeSidebarParams = (name) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.delete(name);
    // console.log("PARAMS", params.toString());
    history.push({ pathname: location.pathname, search: urlParams.toString() });
  };
  // console.log("DROPDOWN OPTIONS", dropdown_options);

  function getUrlParameters() {
    var out = {};
    var str = window.location.search.replace("?", "");
    var subs = str.split(`&`).map((si) => {
      var keyVal = si.split(`=`);
      out[keyVal[0]] = keyVal[1];
    });
    return out;
  }
  // console.log(queryString.parse(this.props.location.search));
  console.log("QS", qs.parse(window.location.search.replace("?", "")));
  console.log("SELECTED FIELD", selectedFields);

  // Exact
  // Search
  // Date
  // Conditional
  return (
    <div className="col-lg-3">
      <div
        className="card"
        style={{ boxShadow: "rgb(227 233 243) 0px 4px 22px" }}
      >
        <div className="card-header">
          <h4 className="card-title"> FILTER BY </h4>
        </div>
        <div className="card-body">
          {SIDEBAR_OPTIONS &&
            SIDEBAR_OPTIONS.map((item) => {
              return (
                <div>
                  <div className="topping">
                    <input
                      type="checkbox"
                      id={item.field}
                      checked={selectedFields && selectedFields[item.field]}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newFields = selectedFields;
                          newFields[item.field] = true;

                          setSelectedFields({
                            ...selectedFields,
                            [item.field]: true,
                          });
                        } else {
                          const newFields = selectedFields;
                          newFields[item.field] = false;
                          setSelectedFields({
                            ...selectedFields,
                            [item.field]: false,
                          });
                          removeSidebarParams(item.field);
                        }
                      }}
                    />
                    <label style={{ paddingLeft: "5px" }} htmlFor={item.field}>
                      {item.label}
                    </label>
                  </div>
                  {item.type == "string" &&
                    selectedFields &&
                    selectedFields[item.field] && (
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            handleSidebarChange(
                              item.field,
                              e.target.value,
                              item.search_type ? item.search_type : "search"
                            );
                          }}
                          value={
                            getSidebarValue(item.field)
                              ? getSidebarValue(item.field)
                              : ""
                          }
                        />
                      </div>
                    )}
                  {item.type == "related" &&
                    selectedFields &&
                    selectedFields[item.field] && (
                      <div>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            handleSidebarChange(
                              `${item.field}_select`,
                              e.target.value
                            );
                          }}
                          value={
                            getSidebarValue(`${item.field}_select`)
                              ? getSidebarValue(`${item.field}_select`)
                              : ""
                          }
                        >
                          <option value=""></option>

                          {dropdown_options &&
                            dropdown_options[item.field] &&
                            dropdown_options[item.field].map((option) => {
                              return (
                                <option value={option.value}>
                                  {option.label}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    )}
                </div>
              );
            })}
          <div className="topping">
            <input
              type="checkbox"
              id={"date_from"}
              checked={selectedFields && selectedFields["date_from"]}
              onChange={(e) => {
                if (e.target.checked) {
                  const newFields = selectedFields;
                  newFields["date_from"] = true;

                  setSelectedFields({
                    ...selectedFields,
                    ["date_from"]: true,
                  });
                } else {
                  const newFields = selectedFields;
                  newFields["date_from"] = false;
                  setSelectedFields({
                    ...selectedFields,
                    ["date_from"]: false,
                  });
                  removeSidebarParams("date_from");
                }
              }}
            />
            <label style={{ paddingLeft: "5px" }} htmlFor={"date_from"}>
              Date From
            </label>
          </div>
          {selectedFields && selectedFields["date_from"] && (
            <div>
              <input
                type="date"
                className="form-control"
                onChange={(e) => {
                  handleSidebarChange("date_from", e.target.value);
                }}
                value={
                  getSidebarValue("date_from")
                    ? getSidebarValue("date_from")
                    : ""
                }
              />
            </div>
          )}
          <div className="topping">
            <input
              type="checkbox"
              id={"date_to"}
              checked={selectedFields && selectedFields["date_to"]}
              onChange={(e) => {
                if (e.target.checked) {
                  const newFields = selectedFields;
                  newFields["date_to"] = true;

                  setSelectedFields({
                    ...selectedFields,
                    ["date_to"]: true,
                  });
                } else {
                  const newFields = selectedFields;
                  newFields["date_to"] = false;
                  setSelectedFields({
                    ...selectedFields,
                    ["date_to"]: false,
                  });
                  removeSidebarParams("date_to");
                }
              }}
            />
            <label style={{ paddingLeft: "5px" }} htmlFor={"date_to"}>
              Date To
            </label>
          </div>
          {selectedFields && selectedFields["date_to"] && (
            <div>
              <input
                type="date"
                className="form-control"
                onChange={(e) => {
                  handleSidebarChange("date_to", e.target.value, "conditional");
                }}
                value={
                  getSidebarValue("date_to") ? getSidebarValue("date_to") : ""
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SidebarFilter;
