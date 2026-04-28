import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as qs from 'qs';
import AsyncSelect from 'react-select/async';
import { useLoggedInUser } from '../../shared/hooks/UseAuth';
function SidebarFilter({
  SIDEBAR_OPTIONS,
  dropdown_options,
  loadOptions,
  col,
}) {
  const [user_data] = useLoggedInUser();
  const { user } = user_data;
  const history = useHistory();
  const location = useLocation();
  const [selectedFields, setSelectedFields] = useState({});

  // Initialize selectedFields from URL parameters
  useEffect(() => {
    const queryParams = qs.parse(window.location.search.replace('?', ''));
    const newSelectedFields = {};

    // Check which filters are active based on URL parameters
    SIDEBAR_OPTIONS.forEach((item) => {
      if (
        item.search_type &&
        queryParams[item.search_type] &&
        queryParams[item.search_type][item.field]
      ) {
        newSelectedFields[item.id] = true;
      } else if (queryParams.search && queryParams.search[item.field]) {
        newSelectedFields[item.id] = true;
      } else if (queryParams.exact && queryParams.exact[item.field]) {
        newSelectedFields[item.id] = true;
      }
    });

    setSelectedFields(newSelectedFields);
  }, [location.search, SIDEBAR_OPTIONS]);

  const handleSidebarChange = ({ name, value, type = 'search', condition }) => {
    const queryParams = qs.parse(window.location.search.replace('?', ''));
    if (type == 'conditional') {
      if (queryParams[type]) {
        if (queryParams[type][name]) {
          if (value && value.length > 0) {
            queryParams[type][name][condition ? condition : '$gte'] = value;
          } else {
            delete queryParams[type][name][condition ? condition : '$gte'];
          }
        } else {
          queryParams[type][name] = {};
          if (value && value.length > 0) {
            queryParams[type][name][condition ? condition : '$gte'] = value;
          } else {
            delete queryParams[type][name][condition ? condition : '$gte'];
          }
        }
      } else {
        queryParams[type] = {};
        queryParams[type][name] = {};
        if (value && value.length > 0) {
          queryParams[type][name][condition ? condition : '$gte'] = value;
        } else {
          delete queryParams[type][name][condition ? condition : '$gte'];
        }
      }
    } else {
      if (queryParams[type]) {
        if (value && value.length > 0) {
          queryParams[type][name] = value;
        } else {
          delete queryParams[type][name];
        }
      } else {
        queryParams[type] = {};
        if (value && value.length > 0) {
          queryParams[type][name] = value;
        } else {
          delete queryParams[type][name];
        }
      }
    }

    const query = qs.stringify(queryParams, {
      encodeValuesOnly: true, // prettify url
    });
    // console.log("PARAMS", params.toString());
    // console.log("QUERY", `${location.pathname}?${query}`);
    history.push(`${location.pathname}?${query}`);
  };

  const removeSidebarParams = (item) => {
    const queryParams = qs.parse(window.location.search.replace('?', ''));
    if (item.search_type) {
      console.log('item.search_type', item.search_type);
      queryParams[item.search_type] &&
        queryParams[item.search_type][item.field] &&
        delete queryParams[item.search_type][item.field];
    } else {
      queryParams['search'] &&
        queryParams['search'][item.field] &&
        delete queryParams['search'][item.field];
    }
    const query = qs.stringify(queryParams, {
      encodeValuesOnly: true, // prettify url
    });
    history.push(`${location.pathname}?${query}`);
  };

  const getSidebarValue = (item) => {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // return urlParams.get(name);
    const queryParams = qs.parse(window.location.search.replace('?', ''));
    if (item.search_type) {
      const searchValue =
        item.search_type == 'conditional'
          ? queryParams[item.search_type] &&
            queryParams[item.search_type][item.field] &&
            queryParams[item.search_type][item.field][item.condition]
          : queryParams[item.search_type]
          ? queryParams[item.search_type][item.field]
          : '';
      return searchValue;
    }
  };

  return (
    <div className={col ? `col-lg-${col}` : 'col-lg-2'}>
      <div
        className='card '
        style={{
          boxShadow: 'rgb(227 233 243) 0px 4px 22px',
          position: 'sticky',
          top: '140px',
        }}
      >
        <div className='card-header'>
          <h4 className='card-title'>
            {' '}
            FILTER
            <button
              onClick={() => {
                setSelectedFields({});
                history.push(`${location.pathname}`);
              }}
              className='btn btn-sm btn-danger'
              style={{ float: 'right' }}
            >
              {' '}
              Clear{' '}
            </button>
          </h4>
        </div>
        <div className='card-body sidebar-component'>
          {SIDEBAR_OPTIONS &&
            SIDEBAR_OPTIONS.map((item) => {
              return (
                <>
                  {item.role ? (
                    <>
                      {item.role === user.role && (
                        <div>
                          <div className='topping'>
                            <input
                              type='checkbox'
                              id={item.id}
                              checked={
                                selectedFields && selectedFields[item.id]
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  const newFields = selectedFields;
                                  newFields[item.id] = true;

                                  setSelectedFields({
                                    ...selectedFields,
                                    [item.id]: true,
                                  });
                                } else {
                                  const newFields = selectedFields;
                                  newFields[item.id] = false;
                                  setSelectedFields({
                                    ...selectedFields,
                                    [item.id]: false,
                                  });
                                  removeSidebarParams(item);
                                }
                              }}
                            />
                            <label
                              style={{ paddingLeft: '5px' }}
                              htmlFor={item.id}
                            >
                              {item.label}
                            </label>
                          </div>
                          {item.type == 'string' &&
                            selectedFields &&
                            selectedFields[item.id] && (
                              <div>
                                <input
                                  type={
                                    item.inputType ? item.inputType : 'text'
                                  }
                                  className='form-control'
                                  onChange={(e) => {
                                    handleSidebarChange({
                                      name: item.field,
                                      value: e.target.value,
                                      type: item.search_type
                                        ? item.search_type
                                        : 'search',
                                      condition: item.condition,
                                    });
                                  }}
                                  value={
                                    getSidebarValue(item)
                                      ? getSidebarValue(item)
                                      : ''
                                  }
                                />
                              </div>
                            )}
                          {item.type == 'select' &&
                            selectedFields &&
                            selectedFields[item.id] && (
                              <div>
                                <select
                                  className='form-control'
                                  onChange={(e) => {
                                    handleSidebarChange({
                                      name: item.field,
                                      value: e.target.value,
                                      type: 'exact',
                                      condition: item.condition,
                                    });
                                  }}
                                  value={
                                    getSidebarValue(item)
                                      ? getSidebarValue(item)
                                      : ''
                                  }
                                >
                                  <option value=''>-</option>
                                  {item.options &&
                                    item.options.map((option) => {
                                      return (
                                        <option
                                          value={option}
                                          key={`${item}-option`}
                                        >
                                          {option}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            )}
                          {item.type == 'related' &&
                            selectedFields &&
                            selectedFields[item.field] && (
                              <div>
                                <AsyncSelect
                                  loadOptions={(inputValue, callback) =>
                                    loadOptions(
                                      inputValue,
                                      callback,
                                      item.field
                                    )
                                  }
                                  defaultOptions={
                                    dropdown_options &&
                                    dropdown_options[item.field]
                                  }
                                  onChange={(e) => {
                                    if (e) {
                                      handleSidebarChange({
                                        name: item.field,
                                        value: e.value,
                                        type: 'exact',
                                        condition: item.condition,
                                      });
                                    }
                                  }}
                                />
                                {/* <select
                         className="form-control"
                         onChange={(e) => {
                           handleSidebarChange({
                             name: item.field,
                             value: e.target.value,
                             type: "exact",
                             condition: item.condition,
                           });
                         }}
                         value={
                           getSidebarValue(item) ? getSidebarValue(item) : ""
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
                       </select> */}
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <div className='topping'>
                        <input
                          type='checkbox'
                          id={item.id}
                          checked={selectedFields && selectedFields[item.id]}
                          onChange={(e) => {
                            if (e.target.checked) {
                              const newFields = selectedFields;
                              newFields[item.id] = true;

                              setSelectedFields({
                                ...selectedFields,
                                [item.id]: true,
                              });
                            } else {
                              const newFields = selectedFields;
                              newFields[item.id] = false;
                              setSelectedFields({
                                ...selectedFields,
                                [item.id]: false,
                              });
                              removeSidebarParams(item);
                            }
                          }}
                        />
                        <label style={{ paddingLeft: '5px' }} htmlFor={item.id}>
                          {item.label}
                        </label>
                      </div>
                      {item.type == 'string' &&
                        selectedFields &&
                        selectedFields[item.id] && (
                          <div>
                            <input
                              type={item.inputType ? item.inputType : 'text'}
                              className='form-control'
                              onChange={(e) => {
                                handleSidebarChange({
                                  name: item.field,
                                  value: e.target.value,
                                  type: item.search_type
                                    ? item.search_type
                                    : 'search',
                                  condition: item.condition,
                                });
                              }}
                              value={
                                getSidebarValue(item)
                                  ? getSidebarValue(item)
                                  : ''
                              }
                            />
                          </div>
                        )}
                      {item.type == 'select' &&
                        selectedFields &&
                        selectedFields[item.id] && (
                          <div>
                            <select
                              className='form-control'
                              onChange={(e) => {
                                handleSidebarChange({
                                  name: item.field,
                                  value: e.target.value,
                                  type: item.search_type || 'search',
                                  condition: item.condition,
                                });
                              }}
                              value={
                                getSidebarValue(item)
                                  ? getSidebarValue(item)
                                  : ''
                              }
                            >
                              <option value=''>-</option>
                              {item.options &&
                                item.options.map((option) => {
                                  return (
                                    <option
                                      value={option}
                                      key={`${item}-option`}
                                    >
                                      {option}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        )}
                      {item.type == 'related' &&
                        selectedFields &&
                        selectedFields[item.field] && (
                          <div>
                            <AsyncSelect
                              loadOptions={(inputValue, callback) =>
                                loadOptions(inputValue, callback, item.field)
                              }
                              defaultOptions={
                                dropdown_options && dropdown_options[item.field]
                              }
                              onChange={(e) => {
                                if (e) {
                                  handleSidebarChange({
                                    name: item.field,
                                    value: e.value,
                                    type: 'exact',
                                    condition: item.condition,
                                  });
                                }
                              }}
                            />
                            {/* <select
                        className="form-control"
                        onChange={(e) => {
                          handleSidebarChange({
                            name: item.field,
                            value: e.target.value,
                            type: "exact",
                            condition: item.condition,
                          });
                        }}
                        value={
                          getSidebarValue(item) ? getSidebarValue(item) : ""
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
                      </select> */}
                          </div>
                        )}
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SidebarFilter;
