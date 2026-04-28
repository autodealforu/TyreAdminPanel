import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as qs from 'qs';

function Pagination({ data, count, pages, loading }) {
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(null);

  const handlePageChange = (page) => {
    const queryParams = qs.parse(window.location.search.replace('?', ''));
    queryParams['pageNumber'] = page;
    const query = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });

    history.push(`${location.pathname}?${query}`);
  };
  useEffect(() => {
    if (pages && count > 0) {
      const queryParams = qs.parse(location.search.replace('?', ''));
      const newPage = queryParams.pageNumber
        ? Number(queryParams.pageNumber)
        : 1;
      if (newPage !== page) {
        setPage(newPage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, pages, count]);
  useEffect(() => {
    if (pages && page > pages) {
      const queryParams = qs.parse(location.search.replace('?', ''));
      queryParams.pageNumber = 1;
      const query = qs.stringify(queryParams, { encodeValuesOnly: true });
      const nextUrl = `${location.pathname}?${query}`;
      const currentUrl = `${location.pathname}${location.search}`;
      if (nextUrl !== currentUrl) {
        history.push(nextUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pages, location.search]);

  const [pageArray, setPageArray] = useState(null);

  useEffect(() => {
    if (pages) {
      let newArray = Array.from({ length: pages }, (_, i) => i + 1);
      setPageArray(newArray);
    }
  }, [pages]);

  return (
    <div>
      {!loading && count > 0 && (
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-8'>
            <nav className=''>
              <ul className='pagination'>
                <li
                  className={
                    page === 1
                      ? 'paginate_button page-item previous disabled'
                      : 'paginate_button page-item previous'
                  }
                >
                  <button
                    type='button'
                    className='page-link'
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </button>
                </li>
                {pages &&
                  pageArray &&
                  pageArray.map((item, index) => {
                    return (
                      <li
                        className={
                          page === index + 1
                            ? 'paginate_button page-item active'
                            : 'paginate_button page-item'
                        }
                        key={index}
                      >
                        <button
                          type='button'
                          className='page-link'
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    );
                  })}
                {/* <li className="paginate_button page-item">
                  <a className="page-link">{page}</a>
                </li> */}

                <li
                  className={
                    page === pages
                      ? 'paginate_button page-item next disabled'
                      : 'paginate_button page-item next'
                  }
                >
                  <button
                    type='button'
                    className='page-link'
                    disabled={page === pages}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagination;
