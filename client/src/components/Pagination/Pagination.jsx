import React from 'react';

export function Pagination ({ elementsPerPage, totalElements, paginate }) {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalElements / elementsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            {pageNumbers.map((number) => (
              <li key={number} class="page-item">
                <button
                class="page-link"
                onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                    }}
                >
                  {number}{" "}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      );
    };