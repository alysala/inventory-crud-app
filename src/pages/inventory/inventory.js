import React, { useMemo } from "react";
import { useTable, usePagination, useSortBy, useFilters, useRowSelect } from "react-table";
import { DefaultColumnFilter, fuzzyTextFilterFn } from "./TableHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSort,
    faSortDown,
    faSortUp,
  } from "@fortawesome/free-solid-svg-icons";

const Inventory = () => {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  // Creates the table
  const table = useTable(
    { columns, defaultColumn, filterTypes },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  // Extracts methods and variables that we can use from the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    rows,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds},
  } = table;

  return (
    <div className="pt-16 p-4 text-gray-800 w-full container mx-auto">

      <h1 className="my-3 text-5xl tracking-wider text-center font-semibold text-black dark:text-gray-300">
        SELECT EXISTING FIT
      </h1>
      <h2 className="py-4 leading-normal md:text-3xl text-2xl text-black dark:text-gray-300">
      </h2>

      {/* Table */}
      <table className="table-auto text-black dark:text-gray-300" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col, index) => (
                <th className="px-4 py-2 border-b text-left" key={index}>
                  <span {...col.getHeaderProps(col.getSortByToggleProps())}>
                    {col.render("Header")}{" "}
                    {typeof col.render("Header") === "string" ? (
                      col.isSorted ? (
                        col.isSortedDesc ? (
                          <FontAwesomeIcon icon={faSortDown} />
                        ) : (
                          <FontAwesomeIcon icon={faSortUp} />
                        )
                      ) : (
                        <FontAwesomeIcon icon={faSort} />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                  <div>{col.canFilter ? col.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="px-4 py-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* pagination */}{" "}
      <div className="inline-flex pt-1">
        <button
          className={`${
            !canPreviousPage ? "cursor-not-allowed opacity-50 " : ""
          }bg-white border border-gray-300 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-l`}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          First
        </button>
        <button
          className={`${
            !canPreviousPage ? "cursor-not-allowed opacity-50 " : ""
          }bg-white border border-gray-300 hover:bg-gray-200 text-gray-800 py-2 px-4`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Prev
        </button>
        <button
          className={`${
            !canNextPage ? "cursor-not-allowed opacity-50 " : ""
          }bg-white border border-gray-300 hover:bg-gray-200 text-gray-800 py-2 px-4`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          className={`${
            !canNextPage ? "cursor-not-allowed opacity-50 " : ""
          }bg-white border border-gray-300 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-r`}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          Last
        </button>
      </div>
      <div className="pt-1 text-black dark:text-gray-300">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          . Showing {page.length} of {rows.length} results.
        </span>
      </div>
      <div className="pt-1">
        <select
          className="block rounded-md border border-gray-300 p-2 bg-white text-sm leading-5 font-medium text-gray-800 focus:outline-none active:bg-gray-50 active:text-gray-800"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {/* Next button */}
        <div className={`${
            Object.keys(selectedRowIds).length !== 0 ? "" : " hidden"
          }`}
        >
          </div>
      </div>
    </div>
  );
};

export default Inventory;
