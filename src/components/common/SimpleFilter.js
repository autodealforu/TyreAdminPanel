import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as qs from 'qs';

function SimpleFilter({ filterOptions = [] }) {
  const history = useHistory();
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const debounceRef = useRef(null);

  // Initialize filters from URL parameters
  useEffect(() => {
    const queryParams = qs.parse(location.search.replace('?', ''));
    const initialFilters = {};

    if (queryParams.exact) {
      Object.keys(queryParams.exact).forEach((key) => {
        if (queryParams.exact[key])
          initialFilters[key] = queryParams.exact[key];
      });
    }
    if (queryParams.search && typeof queryParams.search === 'object') {
      Object.keys(queryParams.search).forEach((key) => {
        if (queryParams.search[key])
          initialFilters[key] = queryParams.search[key];
      });
    }
    setFilters(initialFilters);
  }, [location.search]);

  // Centralized URL updater
  const updateUrl = (fieldName, value, searchType) => {
    const queryParams = qs.parse(location.search.replace('?', ''));
    // Reset to first page on any filter change
    queryParams.pageNumber = 1;

    if (!queryParams[searchType]) queryParams[searchType] = {};

    if (value && value.trim() !== '') {
      queryParams[searchType][fieldName] = value;
    } else if (queryParams[searchType]) {
      delete queryParams[searchType][fieldName];
    }

    if (
      queryParams[searchType] &&
      Object.keys(queryParams[searchType]).length === 0
    ) {
      delete queryParams[searchType];
    }

    const nextQuery = qs.stringify(queryParams, { encodeValuesOnly: true });
    const nextUrl = nextQuery
      ? `${location.pathname}?${nextQuery}`
      : location.pathname;

    // Avoid unnecessary pushes
    const currentUrl = `${location.pathname}${location.search}`;
    if (currentUrl !== nextUrl) history.push(nextUrl);
  };

  // Handle filter change (with optional debounce for text inputs)
  const handleFilterChange = (
    fieldName,
    value,
    searchType = 'exact',
    isText = false
  ) => {
    const nextFilters = { ...filters };
    if (value && value.trim() !== '') nextFilters[fieldName] = value;
    else delete nextFilters[fieldName];
    setFilters(nextFilters);

    if (isText) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(
        () => updateUrl(fieldName, value, searchType),
        300
      );
    } else {
      updateUrl(fieldName, value, searchType);
    }
  };

  const clearAllFilters = () => {
    setFilters({});
    const cleanParams = { pageNumber: 1 };
    const nextQuery = qs.stringify(cleanParams, { encodeValuesOnly: true });
    const nextUrl = nextQuery
      ? `${location.pathname}?${nextQuery}`
      : location.pathname;
    if (`${location.pathname}${location.search}` !== nextUrl)
      history.push(nextUrl);
  };

  const removeFilter = (fieldName) => handleFilterChange(fieldName, '');

  const activeFilterCount = Object.keys(filters).length;

  return (
    <div className='col-lg-12'>
      <div
        className='card mb-3'
        style={{ boxShadow: 'rgb(227 233 243) 0px 4px 22px' }}
      >
        <div className='card-header'>
          <h5 className='card-title mb-0'>
            <i className='fa fa-filter me-2'></i>
            Filters
            {activeFilterCount > 0 && (
              <span className='badge bg-primary ms-2'>{activeFilterCount}</span>
            )}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className='btn btn-sm btn-outline-danger ms-2'
                title='Clear all filters'
              >
                <i className='fa fa-times'></i> Clear All
              </button>
            )}
          </h5>
        </div>
        <div className='card-body'>
          <div className='row g-3 mb-3'>
            {filterOptions.map((option) => (
              <div key={option.field} className='col-md-3'>
                <label className='form-label small fw-bold'>
                  {option.label}
                </label>
                {option.type === 'select' ? (
                  <select
                    className='form-select form-select-sm'
                    value={filters[option.field] || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        option.field,
                        e.target.value,
                        option.searchType || 'exact'
                      )
                    }
                  >
                    <option value=''>All {option.label}</option>
                    {option.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === 'TYRE' && 'Tyre'}
                        {opt === 'ALLOY_WHEEL' && 'Alloy Wheel'}
                        {opt === 'SERVICE' && 'Service'}
                        {opt === 'Active' && 'Active'}
                        {opt === 'Pending' && 'Pending'}
                        {opt === 'Rejected' && 'Rejected'}
                        {![
                          'TYRE',
                          'ALLOY_WHEEL',
                          'SERVICE',
                          'Active',
                          'Pending',
                          'Rejected',
                        ].includes(opt) && opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    placeholder={`Search by ${option.label.toLowerCase()}...`}
                    value={filters[option.field] || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        option.field,
                        e.target.value,
                        option.searchType || 'search',
                        true
                      )
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {activeFilterCount > 0 && (
            <div className='mt-3'>
              <div className='d-flex flex-wrap gap-2'>
                <small className='text-muted fw-bold me-2 align-self-center'>
                  Active Filters:
                </small>
                {Object.entries(filters).map(([fieldName, value]) => {
                  const option = filterOptions.find(
                    (opt) => opt.field === fieldName
                  );
                  const displayLabel = option ? option.label : fieldName;
                  const displayValue =
                    value === 'TYRE'
                      ? 'Tyre'
                      : value === 'ALLOY_WHEEL'
                      ? 'Alloy Wheel'
                      : value === 'SERVICE'
                      ? 'Service'
                      : value;
                  return (
                    <span
                      key={fieldName}
                      className='badge bg-light text-dark border d-flex align-items-center'
                      style={{ fontSize: '0.75rem' }}
                    >
                      <strong>{displayLabel}:</strong>&nbsp;{displayValue}
                      <button
                        type='button'
                        className='btn-close btn-close-sm ms-2'
                        aria-label='Remove filter'
                        onClick={() => removeFilter(fieldName)}
                        style={{ fontSize: '0.6rem' }}
                      ></button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimpleFilter;
